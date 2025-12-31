// Complete React + Tailwind Frontend for RoleManager with UI improvements
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { backendUrl } from "@/json-data/backendServer";

const RolesManager = () => {
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [newRole, setNewRole] = useState("");
    const [unsaved, setUnsaved] = useState({});
    const [expandGroups, setExpandGroups] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        console.log("groups", groups)
    }, [groups])

    const fetchAll = async () => {
        const [r, g, p] = await Promise.all([
            axios.get(`${backendUrl}api/admin-dashboard/get-all-roles`),
            axios.get(`${backendUrl}api/admin-dashboard/groups`),
            axios.get(`${backendUrl}api/admin-dashboard/permissions`),
        ]);
        setRoles(r.data);
        setGroups(g.data);
        setPermissions(p.data);
    };

    const markUnsaved = (id) => setUnsaved((u) => ({ ...u, [id]: true }));
    const clearUnsaved = (id) => {
        const u = { ...unsaved };
        delete u[id];
        setUnsaved(u);
    };

    const handleAddRole = async () => {
        const role_name = newRole.trim().toLowerCase();
        if (!role_name) return;
        try {
            await axios.post(`${backendUrl}api/admin-dashboard/add-roles`, { role_name });
            setNewRole("");
            toast({ title: `Role '${role_name}' added` });
            fetchAll();
        } catch (e) {
            toast({ title: e.response?.data?.detail || e.message });
        }
    };

    const toggleRoleActive = (rIdx) => {
        const r = [...roles];
        r[rIdx].isActive = !r[rIdx].isActive;
        setRoles(r);
        markUnsaved(r[rIdx].id);
    };

    const toggleItem = (rIdx, gpIdx, path = "isActive") => {
        const r = [...roles];
        if (gpIdx !== null && gpIdx !== undefined) {
            r[rIdx].groups_permissions[gpIdx][path] = !r[rIdx].groups_permissions[gpIdx][path];
        }
        setRoles(r);
        markUnsaved(r[rIdx].id);
    };

    const toggleGroupPermission = (rIdx, gpIdx, permIdx) => {
        const r = [...roles];
        r[rIdx].groups_permissions[gpIdx].permissions[permIdx].isActive =
            !r[rIdx].groups_permissions[gpIdx].permissions[permIdx].isActive;
        setRoles(r);
        markUnsaved(r[rIdx].id);
    };

    const saveRole = async (idx) => {
        const role = roles[idx];
        const res = await axios.post(`${backendUrl}api/admin-dashboard/save-role`, role);
        const updated = [...roles];
        updated[idx] = res.data.role;
        setRoles(updated);
        clearUnsaved(role.id);
        toast({ title: "Saved" });
    };

    const deleteRole = async (id) => {
        await axios.delete(`${backendUrl}api/admin-dashboard/delete-role/${id}`);
        fetchAll();
    };

    // const addToRole = (idx, val, type) => {
    //     const r = [...roles];
    //     if (type === "group") {
    //         if (!r[idx].groups_permissions.some(g => g.group_name === val)) {
    //             r[idx].groups_permissions.push({ group_name: val, isActive: true, permissions: [] });
    //         }
    //     } else {
    //         if (!r[idx].groups_permissions.some(p => p.permissions_name === val)) {
    //             r[idx].groups_permissions.push({ permissions_name: val, isActive: true });
    //         }
    //     }
    //     setRoles(r);
    //     markUnsaved(r[idx].id);
    // };

 const addToRole = (idx, val, type) => {
    const r = [...roles];

    if (type === "group") {
        const selectedGroup = groups.find((g) => g.group_name === val);
        if (!selectedGroup) return;

        const alreadyExists = r[idx].groups_permissions.some(g => g.group_name === val);
        if (!alreadyExists) {
            r[idx].groups_permissions.push({
                group_name: selectedGroup.group_name,
                isActive: selectedGroup.isActive,
                permissions: selectedGroup.permissions.map(p => ({
                    permissions_name: p.permissions_name,
                    isActive: p.isActive
                }))
            });
        }
    } else {
        const selectedPermission = permissions.find(p => p.permissions_name === val);
        if (!selectedPermission) return;

        const alreadyExists = r[idx].groups_permissions.some(p => p.permissions_name === val);
        if (!alreadyExists) {
            r[idx].groups_permissions.push({
                permissions_name: selectedPermission.permissions_name,
                isActive: selectedPermission.isActive
            });
        }
    }

    setRoles(r);
    markUnsaved(r[idx].id);
};


    const removeFromRole = (rIdx, gpIdx) => {
        const r = [...roles];
        r[rIdx].groups_permissions.splice(gpIdx, 1);
        setRoles(r);
        markUnsaved(r[rIdx].id);
    };

    const toggleExpand = (key) => setExpandGroups((p) => ({ ...p, [key]: !p[key] }));

    const filteredRoles = roles.filter((r) =>
        r.role_name.toLowerCase().includes(search.toLowerCase()) ||
        r.groups_permissions.some((gp) =>
            (gp.group_name && gp.group_name.toLowerCase().includes(search.toLowerCase())) ||
            (gp.permissions_name && gp.permissions_name.toLowerCase().includes(search.toLowerCase()))
        )
    );

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div className="flex gap-3">
                <Input placeholder="New role..." value={newRole} onChange={(e) => setNewRole(e.target.value)} />
                <Button onClick={handleAddRole}>Add Role</Button>
            </div>
            <div className="flex gap-3">
                <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
            </div>

            {filteredRoles.map((r, rIdx) => {
                const existingGroups = r.groups_permissions.map(g => g.group_name).filter(Boolean);
                const existingPerms = r.groups_permissions.map(p => p.permissions_name).filter(Boolean);

                return (
                    <div key={r.id} className="p-4 border shadow rounded space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-lg">{r.role_name}</div>
                            <div className="flex gap-2">
                                {unsaved[r.id] && <p className="text-yellow-600">⚠ Unsaved changes</p>}
                                <Switch checked={r.isActive} onCheckedChange={() => toggleRoleActive(rIdx)} />
                                <Button onClick={() => saveRole(rIdx)}>Save</Button>
                                <Button variant="destructive" onClick={() => deleteRole(r.id)}>Delete</Button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <select
                                className="border rounded px-2 py-1"
                                onChange={(e) => addToRole(rIdx, e.target.value, "group")}
                            >
                                <option value="">Add group...</option>
                                {groups.filter(g => !existingGroups.includes(g.group_name)).map((g) => (
                                    <option key={g.group_name} value={g.group_name}>{g.group_name}</option>
                                ))}
                            </select>
                            <select
                                className="border rounded px-2 py-1"
                                onChange={(e) => addToRole(rIdx, e.target.value, "perm")}
                            >
                                <option value="">Add permission...</option>
                                {permissions.filter(p => !existingPerms.includes(p.permissions_name)).map((p) => (
                                    <option key={p.permissions_name} value={p.permissions_name}>{p.permissions_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            {r.groups_permissions.map((gp, gpIdx) => {
                                const key = `${r.id}-${gp.group_name || gp.permissions_name}`;
                                const label = gp.group_name ? `Group: ${gp.group_name}` : `Permission: ${gp.permissions_name}`;
                                const tagStyle = gp.group_name
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800";
                                return (
                                    <div key={key} className="p-2 border rounded">
                                        <div className="flex justify-between items-center">
                                            <div className="space-x-2">
                                                <span className={`font-medium text-sm px-2 py-1 rounded ${tagStyle}`}>{label}</span>
                                                <span className="text-xs text-gray-500">[{gp.isActive ? "Active" : "Inactive"}]</span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <Switch checked={gp.isActive} onCheckedChange={() => toggleItem(rIdx, gpIdx)} />
                                                {gp.group_name && (
                                                    <Button size="sm" onClick={() => toggleExpand(key)}>
                                                        {expandGroups[key] ? "Hide" : "Show"} Permissions
                                                    </Button>
                                                )}
                                                <Button size="sm" variant="destructive" onClick={() => removeFromRole(rIdx, gpIdx)}>Remove</Button>
                                            </div>
                                        </div>

                                        {gp.group_name && expandGroups[key] && (
                                            <div className="mt-2 space-y-1 ml-4">
                                                {gp.permissions.map((perm, pIdx) => (
                                                    <div key={perm.permissions_name} className="flex justify-between text-sm">
                                                        <span>{perm.permissions_name}</span>
                                                        <Switch
                                                            checked={perm.isActive}
                                                            onCheckedChange={() => toggleGroupPermission(rIdx, gpIdx, pIdx)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RolesManager;

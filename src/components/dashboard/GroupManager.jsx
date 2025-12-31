"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { backendUrl } from "@/json-data/backendServer";

const GroupManager = () => {
  const [groups, setGroups] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit] = useState(5);
  const [totalGroups, setTotalGroups] = useState(0);
  const [unsaved, setUnsaved] = useState({});

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/admin-dashboard/groups`, {
        params: { skip: page * limit, limit, search },
      });
      setGroups(response.data);
    } catch (err) {
      toast({ title: "Error loading groups", description: err.message });
    }
  };

  const fetchTotal = async () => {
    const res = await axios.get(`${backendUrl}api/admin-dashboard/groups/count`, {
      params: { search }
    });
    setTotalGroups(res.data.total);
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/admin-dashboard/permissions`);
      setPermissions(res.data);
    } catch (err) {
      toast({ title: "Error loading permissions", description: err.message });
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchTotal();
    fetchPermissions();
  }, [page, search]);

  const handleCreateGroup = async () => {
    const name = newGroup.trim().toLowerCase();
    if (!name) return;
    try {
      await axios.post(`${backendUrl}api/admin-dashboard/groups/create`, {
        group_name: name,
        isActive: true,
        permissions: [],
      });
      setNewGroup("");
      toast({ title: `Group "${name}" created` });
      fetchGroups();
      fetchTotal();
    } catch (err) {
      toast({ title: "Create error", description: err.response?.data?.detail || err.message });
    }
  };

  const markUnsaved = (id) => {
    setUnsaved((prev) => ({ ...prev, [id]: true }));
  };

  const clearUnsaved = (id) => {
    setUnsaved((prev) => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
  };

  const handleSaveGroup = async (group, index) => {
    try {
      const res = await axios.post(`${backendUrl}api/admin-dashboard/groups/save`, group);
      const updated = [...groups];
      updated[index] = res.data.group;
      setGroups(updated);
      clearUnsaved(group.id || group.group_name);
      toast({ title: `Group "${group.group_name}" saved` });
    } catch (err) {
      toast({ title: "Save error", description: err.response?.data?.detail || err.message });
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`${backendUrl}api/admin-dashboard/groups/delete/${groupId}`);
      toast({ title: "Group deleted" });
      fetchGroups();
      fetchTotal();
    } catch (err) {
      toast({ title: "Delete error", description: err.response?.data?.detail || err.message });
    }
  };

  const toggleGroupActive = (index) => {
    const updated = [...groups];
    updated[index].isActive = !updated[index].isActive;
    markUnsaved(updated[index].id || updated[index].group_name);
    setGroups(updated);
  };

  const togglePermission = (groupIndex, permName) => {
    const updated = [...groups];
    const group = updated[groupIndex];
    group.permissions = group.permissions.map((p) =>
      p.permissions_name === permName ? { ...p, isActive: !p.isActive } : p
    );
    markUnsaved(group.id || group.group_name);
    setGroups(updated);
  };

  const addPermissionToGroup = (index, permName) => {
    const updated = [...groups];
    const group = updated[index];
    if (group.permissions.some((p) => p.permissions_name === permName)) return;
    group.permissions.push({ permissions_name: permName, isActive: true });
    markUnsaved(group.id || group.group_name);
    setGroups(updated);
  };

  const removePermission = (index, permName) => {
    const updated = [...groups];
    const group = updated[index];
    group.permissions = group.permissions.filter((p) => p.permissions_name !== permName);
    markUnsaved(group.id || group.group_name);
    setGroups(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-xl font-bold">Group Manager</h2>

      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Group name"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
        />
        <Button onClick={handleCreateGroup}>Add Group</Button>
        <Input
          placeholder="Search groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {groups.map((group, index) => {
        const groupId = group.id || group.group_name;
        const usedPermissions = group.permissions.map((p) => p.permissions_name);
        const availablePermissions = permissions.filter(
          (perm) => !usedPermissions.includes(perm.permissions_name)
        );

        return (
          <div key={groupId} className="border p-4 rounded space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{group.group_name}</h3>
                <p className="text-sm text-gray-500">{group.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={group.isActive}
                  onCheckedChange={() => toggleGroupActive(index)}
                />
                <Button onClick={() => handleSaveGroup(group, index)}>Save</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            {unsaved[groupId] && (
              <p className="text-yellow-600 text-sm">⚠️ You have unsaved changes!</p>
            )}

            {/* Add permission dropdown */}
            <div>
              <select
                className="border rounded px-2 py-1"
                onChange={(e) => {
                  if (e.target.value) {
                    addPermissionToGroup(index, e.target.value);
                    e.target.value = "";
                  }
                }}
              >
                <option value="">Add permission...</option>
                {availablePermissions.map((perm) => (
                  <option key={perm.permissions_name} value={perm.permissions_name}>
                    {perm.permissions_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Flex wrap permission chips */}
            <div className="flex flex-wrap gap-2">
              {group.permissions.map((perm) => (
                <div
                  key={perm.permissions_name}
                  className="flex items-center justify-between border px-3 py-2 rounded text-sm w-fit"
                >
                  <div className="mr-3">
                    <p className="font-medium">{perm.permissions_name}</p>
                    <p className="text-xs text-gray-500">
                      {perm.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Switch
                      checked={perm.isActive}
                      onCheckedChange={() =>
                        togglePermission(index, perm.permissions_name)
                      }
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        removePermission(index, perm.permissions_name)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      <div className="flex justify-between pt-4 border-t">
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Showing {page * limit + 1}–{Math.min((page + 1) * limit, totalGroups)} of {totalGroups}
        </span>
        <Button
          disabled={(page + 1) * limit >= totalGroups}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GroupManager;

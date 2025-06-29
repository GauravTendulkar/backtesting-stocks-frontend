"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Save,
  AlertCircle,
  UploadCloud,
  DownloadCloud,
} from "lucide-react";
import { backendUrl } from "@/json-data/backendServer";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";

const RolesAndPermissionChange = () => {
  const [allRoles, setAllRoles] = useState([]);
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [editFlags, setEditFlags] = useState({});
  const [newPermissionByRole, setNewPermissionByRole] = useState({});
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    getAllRoles();
    getPermissionOptions();
  }, []);

  const getAllRoles = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/admin-dashboard/get-all-roles`);
      setAllRoles(res.data || []);
      const flags = {};
      res.data?.forEach((role) => (flags[role._id] = false));
      setEditFlags(flags);
    } catch (error) {
      toast.error("Failed to fetch roles");
    }
  };

  const getPermissionOptions = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/admin-dashboard/get-permissions`);
      setPermissionOptions(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch permissions");
    }
  };

  const handleSaveRole = async (role) => {
    try {
      await axios.put(`${backendUrl}api/admin-dashboard/update-role/${role._id}`, {
        role_title: role.role_title,
        permissions: role.permissions,
      });
      setEditFlags((prev) => ({ ...prev, [role._id]: false }));
      toast.success("Role saved");
      await getAllRoles();
    } catch (error) {
      toast.error("Failed to save role");
    }
  };

  const handleAddRole = async () => {
    if (!newRoleTitle.trim()) return;
    try {
      await axios.post(`${backendUrl}api/admin-dashboard/create-role`, {
        role_title: newRoleTitle,
        permissions: {},
      });
      setNewRoleTitle("");
      toast.success("Role added");
      await getAllRoles();
    } catch (error) {
      toast.error("Failed to add role");
    }
  };

  const updateRolePermissions = (roleId, updateFn) => {
    setAllRoles((prev) =>
      prev.map((role) =>
        role._id === roleId ? { ...role, permissions: updateFn(role.permissions) } : role
      )
    );
    setEditFlags((prev) => ({ ...prev, [roleId]: true }));
  };

  const handleDeletePermission = (roleId, permKey) => {
    updateRolePermissions(roleId, (permissions) => {
      const updated = { ...permissions };
      delete updated[permKey];
      return updated;
    });
  };

  const handleAddPermission = (roleId) => {
    const permKey = newPermissionByRole[roleId];
    if (!permKey) return;
    updateRolePermissions(roleId, (permissions) => ({ ...permissions, [permKey]: true }));
    setNewPermissionByRole((prev) => ({ ...prev, [roleId]: "" }));
  };

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;
    try {
      await axios.delete(`${backendUrl}api/admin-dashboard/delete-role/${roleToDelete}`);
      toast.success("Role deleted");
      await getAllRoles();
    } catch (error) {
      toast.error("Failed to delete role");
    }
    setModalOpen(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(allRoles, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "roles_export.json";
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        await axios.post(`${backendUrl}api/admin-dashboard/import-roles`, json);
        toast.success("Roles imported");
        await getAllRoles();
      } catch (error) {
        toast.error("Invalid import");
      }
    };
    reader.readAsText(file);
  };

  const filteredRoles = allRoles.filter(
    (role) =>
      role.role_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.keys(role.permissions).some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Roles & Permissions</h1>
        <div className="flex gap-3 items-center">
          <label className="cursor-pointer flex items-center gap-1 text-sm text-blue-600">
            <UploadCloud size={18} /> Import
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={handleExport} className="text-sm text-green-600 flex items-center gap-1">
            <DownloadCloud size={18} /> Export
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search roles or permissions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="New role name"
          value={newRoleTitle}
          onChange={(e) => setNewRoleTitle(e.target.value)}
        />
        <button
          onClick={handleAddRole}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus className="inline w-4 h-4" /> Add
        </button>
      </div>

      {filteredRoles.map((role) => (
        <div key={role._id} className="bg-white shadow rounded p-4 space-y-3">
          <div className="flex justify-between items-center">
            <input
              className="text-lg font-semibold border-b px-2 py-1 w-full"
              value={role.role_title}
              onChange={(e) => {
                setAllRoles((prev) =>
                  prev.map((r) => (r._id === role._id ? { ...r, role_title: e.target.value } : r))
                );
                setEditFlags((prev) => ({ ...prev, [role._id]: true }));
              }}
            />
            <div className="flex items-center gap-2">
              {editFlags[role._id] && (
                <span className="text-yellow-700 text-sm flex items-center gap-1">
                  <AlertCircle size={16} /> Unsaved
                </span>
              )}
              <button onClick={() => handleSaveRole(role)} title="Save">
                <Save className="text-blue-600 hover:text-blue-800" />
              </button>
              <button
                onClick={() => {
                  setRoleToDelete(role._id);
                  setModalOpen(true);
                }}
                title="Delete Role"
              >
                <Trash2 className="text-red-600 hover:text-red-800" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.entries(role.permissions).map(([permKey, enabled]) => (
              <div key={permKey} className="flex items-center justify-between px-2 py-1 border rounded">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() =>
                      updateRolePermissions(role._id, (permissions) => ({
                        ...permissions,
                        [permKey]: !permissions[permKey],
                      }))
                    }
                  />
                  {permKey}
                </label>
                <button
                  onClick={() => handleDeletePermission(role._id, permKey)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center mt-2">
            <select
              className="border rounded px-2 py-1"
              value={newPermissionByRole[role._id] || ""}
              onChange={(e) =>
                setNewPermissionByRole((prev) => ({ ...prev, [role._id]: e.target.value }))
              }
            >
              <option value="">Add Permission</option>
              {permissionOptions.map(
                (opt) =>
                  !role.permissions[opt] && (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
              )}
            </select>
            <button
              onClick={() => handleAddPermission(role._id)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      ))}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <Dialog.Title className="text-lg font-bold">Confirm Deletion</Dialog.Title>
            <Dialog.Description className="mt-2">
              Are you sure you want to delete this role? This action cannot be undone.
            </Dialog.Description>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRole}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default RolesAndPermissionChange;
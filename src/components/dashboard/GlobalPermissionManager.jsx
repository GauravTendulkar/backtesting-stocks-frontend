import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "@/json-data/backendServer";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

const GlobalPermissionManager = () => {
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [newGlobalPermission, setNewGlobalPermission] = useState("");

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/admin-dashboard/get-permissions`);
      setPermissionOptions(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch global permissions");
    }
  };

  const addGlobalPermission = async () => {
    if (!newGlobalPermission.trim()) return;
    try {
      await axios.post(`${backendUrl}api/admin-dashboard/add-permission`, null, {
        params: { permission: newGlobalPermission },
      });
      toast.success("Global permission added");
      setNewGlobalPermission("");
      fetchPermissions();
    } catch (error) {
      toast.error("Failed to add permission");
    }
  };

  const deleteGlobalPermission = async (perm) => {
    try {
      await axios.delete(`${backendUrl}api/admin-dashboard/delete-permission/${encodeURIComponent(perm)}`);
      toast.success("Global permission deleted");
      fetchPermissions();
    } catch (error) {
      toast.error("Failed to delete permission");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Manage Global Permissions</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="New permission"
          value={newGlobalPermission}
          onChange={(e) => setNewGlobalPermission(e.target.value)}
        />
        <button
          onClick={addGlobalPermission}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus size={16} />
        </button>
      </div>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {permissionOptions.map((perm) => (
          <li key={perm} className="flex justify-between items-center border px-3 py-2 rounded">
            <span>{perm}</span>
            <button
              onClick={() => deleteGlobalPermission(perm)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalPermissionManager;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { backendUrl } from "@/json-data/backendServer";

const PermissionManager = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Fetch initial permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`${backendUrl}api/admin-dashboard/permissions`);
        setPermissions(response.data);
      } catch (error) {
        toast({ title: "Error fetching permissions", description: error.message });
      }
    };

    fetchPermissions();
  }, []);

  // Add new permission (lowercase + unique)
  const handleAddPermission = () => {
    const trimmed = newPermission.trim().toLowerCase();
    if (!trimmed) return;

    const exists = permissions.some(
      (perm) => perm.permissions_name.toLowerCase() === trimmed
    );
    if (exists) {
      toast({ title: "Permission already exists", description: `${trimmed} already in list` });
      return;
    }

    const newEntry = { permissions_name: trimmed, isActive: true };
    setPermissions((prev) => [...prev, newEntry]);
    setNewPermission("");
    setUnsavedChanges(true);
  };

  // Delete permission
  const handleDeletePermission = (name) => {
    setPermissions((prev) =>
      prev.filter((perm) => perm.permissions_name !== name)
    );
    setUnsavedChanges(true);
  };

  // Toggle isActive
  const handleToggle = (name) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.permissions_name === name
          ? { ...perm, isActive: !perm.isActive }
          : perm
      )
    );
    setUnsavedChanges(true);
  };

  // Save changes
  const handleSave = async () => {
    try {
      await axios.post(`${backendUrl}api/admin-dashboard/permissions/save`, { permissions });
      toast({ title: "Permissions saved successfully" });
      setUnsavedChanges(false);
    } catch (error) {
      toast({ title: "Save failed", description: error.message });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-xl font-bold">Permission Manager</h2>

      <div className="flex items-center gap-2">
        <Input
          placeholder="e.g. admin.dashboard"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
        />
        <Button onClick={handleAddPermission}>Add Permission</Button>
      </div>

      <div className="space-y-4">
        {permissions.map((perm) => (
          <div
            key={perm.permissions_name}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            <div>
              <p className="font-medium">{perm.permissions_name}</p>
              <p className="text-sm text-gray-500">
                {perm.isActive ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={perm.isActive}
                onCheckedChange={() => handleToggle(perm.permissions_name)}
              />
              <Button
                variant="destructive"
                onClick={() => handleDeletePermission(perm.permissions_name)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {unsavedChanges && (
        <div className="flex items-center justify-between mt-6 p-4 border-t pt-4">
          <p className="text-yellow-600 font-medium">Unsaved changes</p>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default PermissionManager;

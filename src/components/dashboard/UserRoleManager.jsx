"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/json-data/backendServer";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import debounce from "lodash.debounce";

const UserRoleManager = () => {
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}api/social-user-role-change/get-all-users`, {
        params: {
          search: debouncedSearchTerm,
          role: roleFilter,
          date_filter: dateFilter,
          page: currentPage,
          limit: usersPerPage,
        },
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.total_pages || 1);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/admin-dashboard/get-all-roles`);
      setAllRoles(res.data.map((r) => r.role_title) || []);
    } catch (error) {
      toast.error("Failed to fetch roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm, roleFilter, dateFilter, currentPage]);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);
    handler();
    return () => handler.cancel();
  }, [searchTerm]);

  const handleAddRoleToUser = async (userId, role) => {
    try {
      await axios.post(`${backendUrl}api/social-user-role-change/add-role-to-user`, {
        user_id: userId,
        role,
      });
      toast.success("Role added");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to add role");
    }
  };

  const handleRemoveRoleFromUser = async (userId, role) => {
    try {
      await axios.post(`${backendUrl}api/social-user-role-change/remove-role-from-user`, {
        user_id: userId,
        role,
      });
      toast.success("Role removed");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to remove role");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-xl font-bold">User Role Manager</h2>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="none">No Roles</option>
          {allRoles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Accounts</option>
          <option value="recent">Created in Last 30 Days</option>
          <option value="older">Older than 30 Days</option>
        </select>
      </div>

      {loading ? (
        <div className="animate-pulse text-center text-gray-500">Loading users...</div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {users.map((user) => (
            <div key={user._id} className="border rounded p-4 space-y-2">
              <div className="font-semibold">{user.full_name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
              <div className="text-xs text-gray-500">
                Created: {dayjs(user.account_created).format("YYYY-MM-DD")} | Last Sign-in: {" "}
                {dayjs(user.last_signin).format("YYYY-MM-DD")}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {user.roles?.map((role) => (
                  <div
                    key={role}
                    className="bg-gray-100 border px-2 py-1 rounded flex items-center gap-1"
                  >
                    {role}
                    <button
                      onClick={() => handleRemoveRoleFromUser(user._id, role)}
                      className="text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <select
                  onChange={(e) => handleAddRoleToUser(user._id, e.target.value)}
                  className="border rounded px-2 py-1"
                  defaultValue=""
                >
                  <option value="">Add Role</option>
                  {allRoles
                    .filter((r) => !user.roles?.includes(r))
                    .map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 pt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserRoleManager;

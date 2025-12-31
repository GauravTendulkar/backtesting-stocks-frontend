// Updated UserRoleManager and RoleEditor using MUI DateTimePicker with UTC handling
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/json-data/backendServer";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Select, MenuItem, Button, InputLabel, FormControl } from "@mui/material";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.tz.setDefault("Asia/Kolkata");

const USERS_PER_PAGE = 10;

const RoleEditor = ({ userId, existingRoles, allRoles, onUpdate }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [startDate, setStartDate] = useState(dayjs.utc());
  const [endDate, setEndDate] = useState(dayjs.utc());
  const [limitType, setLimitType] = useState("unlimited");
  const [customAmount, setCustomAmount] = useState(1);
  const [customUnit, setCustomUnit] = useState("day");

  const handleAdd = async () => {
    if (!selectedRole || !startDate || !endDate || !limitType) {
      toast.error("Fill all fields");
      return;
    }
    try {
      await axios.post(`${backendUrl}api/social-user-role-change/add-role-to-user`, {
        user_id: userId,
        name: selectedRole,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        limit: limitType,
      });
      toast.success("Role added");
      onUpdate();
      setSelectedRole("");
    } catch {
      toast.error("Failed to add role");
    }
  };

  const handleEdit = async (role) => {
    try {
      await axios.post(`${backendUrl}api/social-user-role-change/update-role-dates`, {
        user_id: userId,
        name: role.name,
        start_date: role.start_date,
        end_date: role.end_date,
        limit: role.limit,
      });
      toast.success("Role updated");
      onUpdate();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleRemove = async (roleName) => {
    try {
      await axios.post(`${backendUrl}api/social-user-role-change/remove-role-from-user`, {
        user_id: userId,
        role_name: roleName,
      });
      toast.success("Role removed");
      onUpdate();
    } catch {
      toast.error("Failed to remove role");
    }
  };

  const updateExistingEndDate = (role, amount, unit) => {
    const newEnd = dayjs.utc(role.start_date).add(amount, unit);
    role.end_date = newEnd.toISOString();
    handleEdit(role);
  };

  const timeRemaining = (end) => {
    const now = dayjs().tz();
    const endTime = dayjs(end).tz();
    return endTime.isBefore(now) ? "Expired" : endTime.fromNow(true);
  };

  const calcDuration = (start, end) => {
    const d = dayjs.duration(dayjs(end).diff(dayjs(start)));
    return `${d.days()}d ${d.hours()}h ${d.minutes()}m`;
  };

  return (
    <div className="space-y-2 mt-2">
      {existingRoles?.map((role, i) => {
        const s = dayjs.utc(role.start_date).tz();
        const e = dayjs.utc(role.end_date).tz();
        return (
          <div key={i} className="border rounded p-2 space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-semibold">{role.name}</span>
              <span className="text-sm text-gray-600">
                {s.format("YYYY-MM-DD HH:mm")} - {e.format("YYYY-MM-DD HH:mm")}
              </span>
              <span className="text-sm text-blue-600">({calcDuration(s, e)})</span>
              <span className="text-sm text-red-600">[expires in: {timeRemaining(e)}]</span>
              <span className="text-sm text-green-600">[{role.limit}]</span>
              <button className="text-red-500" onClick={() => handleRemove(role.name)}>
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <DateTimePicker
                label="Start"
                value={s}
                onChange={(date) => {
                  role.start_date = dayjs(date).utc().toISOString();
                  handleEdit(role);
                }}
                slotProps={{ textField: { size: "small" } }}
              />
              <DateTimePicker
                label="End"
                value={e}
                onChange={(date) => {
                  role.end_date = dayjs(date).utc().toISOString();
                  handleEdit(role);
                }}
                slotProps={{ textField: { size: "small" } }}
              />
              <Select
                size="small"
                value={role.limit}
                onChange={(e) => {
                  role.limit = e.target.value;
                  handleEdit(role);
                }}
              >
                <MenuItem value="unlimited">Unlimited</MenuItem>
                <MenuItem value="limited">Limited</MenuItem>
              </Select>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="border px-2 py-1 rounded w-20"
              />
              <select
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="minute">Minutes</option>
                <option value="hour">Hours</option>
                <option value="day">Days</option>
                <option value="month">Months</option>
              </select>
              <button
                onClick={() => updateExistingEndDate(role, customAmount, customUnit)}
                className="bg-blue-100 px-3 py-1 rounded"
              >
                Add to End
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex flex-wrap gap-2 items-center">
        <Select
          size="small"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Select Role</MenuItem>
          {allRoles
            .filter((r) => !existingRoles?.some((role) => role.name === r))
            .map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
        </Select>
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(dayjs(newValue).utc())}
          slotProps={{ textField: { size: "small" } }}
        />
        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(dayjs(newValue).utc())}
          slotProps={{ textField: { size: "small" } }}
        />
        <Select
          size="small"
          value={limitType}
          onChange={(e) => setLimitType(e.target.value)}
        >
          <MenuItem value="unlimited">Unlimited</MenuItem>
          <MenuItem value="limited">Limited</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleAdd}>Add Role</Button>
      </div>
    </div>
  );
};

const UserRoleManager = () => {
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [specificRole, setSpecificRole] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/social-user-role-change/get-all-users`, {
        params: { page, limit: USERS_PER_PAGE, filter: roleFilter, role: specificRole || undefined },
      });
      setUsers(res.data.users || []);
      setTotalUsers(res.data.total || 0);
    } catch {
      toast.error("Error fetching users");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/admin-dashboard/get-all-roles`);
      setAllRoles(res.data.map((r) => r.role_name));
    } catch {
      toast.error("Error fetching roles");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [page, roleFilter, specificRole]);

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold">User Role Manager</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <TextField
            size="small"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select size="small" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <MenuItem value="all">All Users</MenuItem>
            <MenuItem value="with">With Roles</MenuItem>
            <MenuItem value="without">Without Roles</MenuItem>
          </Select>
          <Select size="small" value={specificRole} onChange={(e) => setSpecificRole(e.target.value)}>
            <MenuItem value="">All Roles</MenuItem>
            {allRoles.map((role) => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </Select>
        </div>

        <div className="text-sm text-gray-600">Total Users: {totalUsers}</div>

        {filteredUsers.map((user) => (
          <div key={user._id} className="border rounded p-4 space-y-2">
            <div className="font-semibold">
              {user.full_name} ({user.email})
            </div>
            <RoleEditor
              userId={user._id}
              existingRoles={user.roles || []}
              allRoles={allRoles}
              onUpdate={fetchUsers}
            />
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
          <span className="text-sm">Page {page}</span>
          <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default UserRoleManager;

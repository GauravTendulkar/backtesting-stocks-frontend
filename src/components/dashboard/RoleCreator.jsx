"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputInteger from '../InputInteger'
import { backendUrl } from '@/json-data/backendServer'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

const RoleCreator = ({ onCreated }) => {
    const [roleName, setRoleName] = useState('')
    const [allRoles, setAllRoles] = useState([])
    const [dateRange, setDateRange] = useState([])
    const [showDateRange, setShowDateRange] = useState(false)

    const fetchDefault = async () => {
        const res = await axios.get(`${backendUrl}api/date_range/get-default-date-range`)
        setDateRange(res.data)
    }

    const fetchRoles = async () => {
        try {
            const res = await axios.get(`${backendUrl}api/admin-dashboard/get-all-role-names`)
            setAllRoles(res.data)
        } catch (err) {
            console.error("Error fetching roles:", err)
        }
    }

    useEffect(() => {
        fetchDefault()
        fetchRoles()
    }, [])

    const handleChange = (value, index, field) => {
        const temp = [...dateRange]
        temp[index]["range"][field] = value
        setDateRange(temp)
    }

    const handleSubmit = async () => {
        if (!roleName) {
            toast.error("Please select a role name")
            return
        }

        try {
            await axios.post(`${backendUrl}api/date_range/create-role-with-date-range`, {
                role_name: roleName,
                date_range: dateRange
            })
            toast.success("Role created successfully")
            setRoleName("")
            fetchDefault()
            onCreated()
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Error creating role")
        }
    }

    return (
        <div className="space-y-4 border p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold">Create New Role</h2>

            <select
                className="w-full p-2 border border-gray-300 rounded"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
            >
                <option value="">Select a role name</option>
                {allRoles.map((role) => (
                    <option key={role.id} value={role.role_name}>
                        {role.role_name}
                    </option>
                ))}
            </select>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowDateRange(prev => !prev)}
            >
                {showDateRange ? "Hide Date Range" : "Show Date Range"}
            </Button>

            {showDateRange && (
                <div className="space-y-2">
                    {dateRange.map((e, i) => (
                        <div key={i} className="grid grid-cols-6 items-center gap-2 bg-slate-100 p-2 rounded">
                            <div className="font-medium">TF:</div>
                            <div>{e.tf}</div>
                            <InputInteger value={e.range.years} onChange={(val) => handleChange(val, i, "years")} />
                            <InputInteger value={e.range.months} onChange={(val) => handleChange(val, i, "months")} />
                            <InputInteger value={e.range.days} onChange={(val) => handleChange(val, i, "days")} />
                        </div>
                    ))}
                </div>
            )}

            <Button className="w-full" onClick={handleSubmit}>
                Create Role
            </Button>
        </div>
    )
}

export default RoleCreator

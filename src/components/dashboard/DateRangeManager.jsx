"use client"

import { backendUrl } from '@/json-data/backendServer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DateRangeDisplay from './DateRangeDisplay'
import RoleCreator from './RoleCreator'
import toast, { Toaster } from 'react-hot-toast'

const DateRangeManager = () => {
    const [allRanges, setAllRanges] = useState([])
    const [visibleRangeIndexes, setVisibleRangeIndexes] = useState({})
    const [editedIndexes, setEditedIndexes] = useState({})

    const fetchAllRanges = async () => {
        try {
            const res = await axios.get(`${backendUrl}api/date_range/get-all-date-range`)
            setAllRanges(res.data)

            // All ranges hidden by default
            const initialVisibility = {}
            res.data.forEach((_, i) => {
                initialVisibility[i] = false
            })
            setVisibleRangeIndexes(initialVisibility)
            setEditedIndexes({})
        } catch (err) {
            toast.error("Failed to load date ranges")
        }
    }

    useEffect(() => {
        fetchAllRanges()
    }, [])

    const handleChange = (newValue, index) => {
        const updated = [...allRanges]
        updated[index].date_range = newValue
        setAllRanges(updated)
        setEditedIndexes(prev => ({ ...prev, [index]: true }))
    }

    const handleSave = async (index) => {
        const { _id, role_name, date_range } = allRanges[index]
        try {
            await axios.post(`${backendUrl}api/date_range/set-one-date-range`, {
                id: _id,
                role_name,
                date_range
            })
            toast.success(`Saved: ${role_name}`)
            setEditedIndexes(prev => {
                const updated = { ...prev }
                delete updated[index]
                return updated
            })
        } catch (error) {
            toast.error(`Error saving ${role_name}`)
        }
    }

    const handleDelete = async (index) => {
        const { _id, role_name } = allRanges[index]
        const confirm = window.confirm(`Are you sure you want to delete ${role_name}?`)
        if (!confirm) return

        try {
            await axios.post(`${backendUrl}api/date_range/delete-one-date-range`, {
                id: _id
            })
            toast.success(`Deleted: ${role_name}`)
            fetchAllRanges()
        } catch (error) {
            toast.error(`Error deleting ${role_name}`)
        }
    }

    const toggleRangeVisibility = (index) => {
        setVisibleRangeIndexes(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className="p-4 space-y-6">
            <Toaster position="top-right" />
            <RoleCreator onCreated={fetchAllRanges} />

            {allRanges.map((role, idx) => (
                <div key={idx} className="bg-slate-100 rounded-lg p-4 shadow space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">{role.role_name}</h2>
                        <button
                            onClick={() => toggleRangeVisibility(idx)}
                            className="text-blue-600 underline text-sm"
                        >
                            {visibleRangeIndexes[idx] ? "Hide" : "Show"} Date Range
                        </button>
                    </div>

                    {visibleRangeIndexes[idx] && (
                        <>
                            <DateRangeDisplay
                                value={role.date_range}
                                onChange={(val) => handleChange(val, idx)}
                            />
                            {editedIndexes[idx] && (
                                <div className="text-yellow-700 text-sm">Remember to save changes!</div>
                            )}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleSave(idx)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => handleDelete(idx)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default DateRangeManager

"use client";
import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetFilesInfo = ({ session }) => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [folder, setFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalFiles, setModalFiles] = useState([]);
  const [isBulk, setIsBulk] = useState(false);

  async function getFilesInfo() {
    try {
      const response = await axios.post(`${backendUrl}api/admin-dashboard/get-new-data-name`, {
        folder_name: selectedFolder,
      });
      const data = response?.data || [];
      setFiles(data);
      setFilteredFiles(data);
      setSelectedFiles([]);
      setSelectAll(false);
    } catch (err) {
      toast.error("Error fetching files");
    }
  }



  useEffect(() => {
    if (selectedFiles.length < files.length) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (selectedFolder !== "") getFilesInfo();
  }, [selectedFolder]);

  useEffect(() => {
    const fetchFolderList = async () => {
      try {
        const response = await axios.get(`${backendUrl}api/admin-dashboard/file-folder`);
        const folderData = response?.data || [];
        setFolder(folderData);
        setSelectedFolder(folderData[0] || "");
      } catch (error) {
        console.error("Error fetching folder list:", error);
      }
    };
    console.log("fetchFolderList()****************")
    fetchFolderList();
  }, []);

  useEffect(() => {
    let updated = [...files];

    if (searchQuery) {
      updated = updated.filter(file =>
        file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "date") {
      updated.sort((a, b) => new Date(b.last_date) - new Date(a.last_date));
    } else if (sortOption === "size") {
      updated.sort((a, b) => b.file_size[0] - a.file_size[0]);
    }

    setFilteredFiles(updated);
  }, [searchQuery, sortOption, files]);

  const handleRefresh = () => getFilesInfo();

  const handleDeleteFiles = async (filesList) => {
    try {
      await axios.post(`${backendUrl}api/admin-dashboard/delete-new-data-name`, {
        files_list: filesList,
        folder_name: selectedFolder,
      });
      toast.success("File(s) deleted successfully");
      getFilesInfo();
    } catch (err) {
      toast.error("Error deleting file(s)");
    }
  };

  const toggleFile = (fileName) => {
    setSelectedFiles(prev =>
      prev.includes(fileName)
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
      setSelectAll(false);
    } else {
      const allNames = filteredFiles.map(file => file.file_name);
      setSelectedFiles(allNames);
      setSelectAll(true);
    }
  };

  const openConfirmModal = (files, bulk = false) => {
    setModalFiles(files);
    setIsBulk(bulk);
    setShowModal(true);
  };

  const confirmDelete = () => {
    handleDeleteFiles(modalFiles);
    setShowModal(false);
  };

  const handleFolderList = (value) => {
    setSelectedFolder(value);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Uploaded Files</h2>

        <select
          value={selectedFolder}
          onChange={(e) => handleFolderList(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
        >
          {folder.map((e, id) => (
            <option key={id} value={e}>{e}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort By</option>
          <option value="date">Date (Latest)</option>
          <option value="size">Size (Largest)</option>
        </select>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
          {selectedFiles.length > 0 && (
            <button
              onClick={() => openConfirmModal(selectedFiles, true)}
              className="flex items-center px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Selected
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-3 py-2 border-b">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-2 border-b text-left">File Name</th>
              <th className="px-4 py-2 border-b text-left">Last Date</th>
              <th className="px-4 py-2 border-b text-left">File Size</th>
              <th className="px-4 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {filteredFiles.map((file, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.file_name)}
                    onChange={() => toggleFile(file.file_name)}
                  />
                </td>
                <td className="px-4 py-2">{file.file_name}</td>
                <td className="px-4 py-2">{file.last_date}</td>
                <td className="px-4 py-2">
                  {file.file_size[0]} {file.file_size[1]}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openConfirmModal([file.file_name], false)}
                    className="text-red-600 hover:text-red-800 transition p-1 rounded-full"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <div className="text-sm text-gray-600">
              {isBulk ? (
                <>
                  Are you sure you want to delete the following files?
                  <ul className="list-disc pl-5 mt-2 max-h-40 overflow-y-auto">
                    {modalFiles.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>Are you sure you want to delete <strong>{modalFiles[0]}</strong>?</>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 text-gray-700 border rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetFilesInfo;

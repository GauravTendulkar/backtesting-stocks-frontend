"use client";
import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import { useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

export default function NewDataFileUpload() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files));
      setStatus('idle');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length) {
      setFiles(Array.from(e.dataTransfer.files));
      setStatus('idle');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFileUpload = async () => {
    if (!files.length) return;

    setStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      await axios.post(`${backendUrl}api/admin-dashboard/upload-new-data`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          const progress = event.total
            ? Math.round((event.loaded * 100) / event.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      setStatus('success');
      setUploadProgress(100);
      setFiles([]);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-2xl shadow-2xl bg-white space-y-6">
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-100'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <UploadCloud className="w-12 h-12 text-blue-500 mb-4" />
        <p className="text-lg font-medium text-gray-600 mb-2">Drag & drop your files here</p>
        <span className="text-sm text-gray-500 mb-2">or</span>
        <label className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-5 py-2 rounded-md text-sm cursor-pointer">
          Browse Files
          <input type="file" className="hidden" onChange={handleFileChange} multiple />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, idx) => (
            <div key={idx} className="relative bg-blue-50 border border-blue-200 p-4 rounded-md shadow-sm space-y-1">
              <button
                onClick={() => handleRemoveFile(idx)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <File className="w-5 h-5" />
                {file.name}
              </div>
              <p className="text-sm text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>
              <p className="text-sm text-gray-600">Type: {file.type}</p>
            </div>
          ))}
        </div>
      )}

      {status === 'uploading' && (
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center">{uploadProgress}% uploaded</p>
        </div>
      )}

      {files.length > 0 && status !== 'uploading' && (
        <button
          onClick={handleFileUpload}
          className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Upload Files
        </button>
      )}

      {status === 'success' && (
        <p className="text-green-600 text-sm text-center font-medium">
          ✅ Files uploaded successfully!
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center font-medium">
          ❌ Upload failed. Please try again.
        </p>
      )}
    </div>
  );
}

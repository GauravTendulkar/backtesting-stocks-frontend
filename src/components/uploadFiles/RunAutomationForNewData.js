import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import React, { useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const RunAutomationForNewData = () => {
  const [status, setStatus] = useState('idle'); // idle | working | success | error

  const handleUpdateNewData = async () => {
    try {
      setStatus('working');
      await axios.post(`${backendUrl}api/admin-dashboard/update-new-data`);
      setStatus('success');
    } catch (err) {
      console.error("Error updating data:", err);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000); // reset after 3 seconds
    }
  };

  const getStatusIndicator = () => {
    if (status === 'working') {
      return (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Updating...
        </div>
      );
    }
    if (status === 'success') {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          Update successful!
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <XCircle className="w-5 h-5" />
          Update failed.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-fit mx-auto">
      <button
        onClick={handleUpdateNewData}
        disabled={status === 'working'}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow disabled:opacity-60"
      >
        {status === 'working' ? 'Updating...' : 'Update New Data'}
      </button>

      <div className="mt-3">
        {getStatusIndicator()}
      </div>
    </div>
  );
};

export default RunAutomationForNewData;

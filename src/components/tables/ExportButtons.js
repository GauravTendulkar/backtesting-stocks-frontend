// components/ExportButtons.jsx
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';

const ExportButtons = ({ data, fileName = 'export' }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  // Export to Excel (.xlsx)
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  // Export to CSV (.csv)
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={exportToExcel} variant="default">
        Export to Excel
      </Button>
      <Button onClick={exportToCSV} variant="secondary">
        Export to CSV
      </Button>
    </div>
  );
};

export default ExportButtons;

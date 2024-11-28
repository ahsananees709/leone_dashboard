import React, { useState } from "react";
import EditTitleModal from './EditTitleModal';

function DataTable({ data, setData }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 mt-2">
        <thead>
          <tr className="bg-[#605EA1] text-white">
            <th className="px-4 py-2 border-b text-left">Item ID</th>
            <th className="px-4 py-2 border-b text-left">Title</th>
            <th className="px-4 py-2 border-b text-left">URL</th>
            <th className="px-4 py-2 border-b text-left">Today's Ranking</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-gray-100 hover:bg-gray-200">
              <td className="px-4 py-2 border-b">{item.id}</td>
              <td className="px-4 py-2 border-b">{item.title}</td>
              <td className="px-4 py-2 text-blue-900 border-b">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </td>
              <td className="px-4 py-2 border-b">{item.todayRanking}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-[#22177A] px-2 py-1 text-white hover:bg-[#605EA1]"
                >
                  Edit Title
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditTitleModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
        setData={setData}
      />
    </div>
  );
}

export default DataTable;

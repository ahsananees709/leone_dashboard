import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { toast } from "react-toastify";

export default function EditTitleModal({ item, isOpen, onClose, onSave, setData }) {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (item) {
      setNewTitle(item.title);
    }
  }, [item]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(`${base_url}/${item.id}`, { productName: newTitle });
      
      if (response.data.success) {
        setData((prevData) =>
          prevData.map((dataItem) =>
            dataItem.id === item.id
              ? { ...dataItem, title: newTitle }
              : dataItem
          )
        );
        toast.success(response.data.message); 
        onSave();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while updating the title.";
      toast.error(errorMessage); 
      console.error("Error updating title:", error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl text-center text-white font-semibold mb-4 bg-[#22177A] py-2">Update Property Title</h2>
              <label className="font-semibold ">Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border border-gray-300 w-full px-3 py-2 rounded mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white hover:border-blue-400"
          placeholder="Enter new title"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              setNewTitle("");
              onClose();
            }}
            className="px-4 py-2 mr-2 rounded bg-[#8EA3A6] text-white hover:bg-[#605EA1]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white rounded bg-[#22177A] text-white hover:bg-[#605EA1]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

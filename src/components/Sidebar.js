import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // For hamburger icon and close icon

function TopBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for toggling mobile menu

  const isActive = (path) => location.pathname === path ? 'bg-[#8EA3A6]' : '';

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-[#22177A] text-white p-2 shadow-md">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard</h2>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/dashboard/products"
            className={`p-2 rounded ${isActive("/dashboard/products")} hover:bg-[#605EA1]`}
          >
            Products
          </Link>
          <Link
            to="/dashboard/chart"
            className={`p-2 rounded ${isActive("/dashboard/chart")} hover:bg-[#605EA1]`}
          >
            Chart
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link
            to="/dashboard/products"
            className={`block p-2 rounded ${isActive("/dashboard/products")} hover:bg-gray-700`}
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/dashboard/chart"
            className={`block p-2 rounded ${isActive("/dashboard/chart")} hover:bg-gray-700`}
            onClick={() => setIsOpen(false)}
          >
            Chart
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;

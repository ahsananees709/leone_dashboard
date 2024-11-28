import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import { fetchProductRankings } from "../data/productsData";
import Loader from "../components/Loader";

const ChartPage = () => {
  const [page, setPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(10);
  const [productsData, setProductsData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading,setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchProductRankings(page, displayCount, startDate, endDate);
      setStartDate(response?.data?.startDate);
      setEndDate(response?.data?.endDate);
      setProductsData(response.data.products);
      setTotalProducts(response.data.totalCount);
      setTotalPages(response.data.totalPages);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching product rankings", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, displayCount, startDate, endDate]);

  const handleNextProducts = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrevProducts = () => {
    if (page > 1) setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleLimitChange = (e) => {
    setDisplayCount(Number(e.target.value));
    setPage(1);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setPage(1);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setPage(1);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-4">
      {/* Date Picker Section */}
      <div className="flex flex-wrap justify-center items-center gap-6 p-2 bg-gray-200">
        <label className="flex items-center gap-2 font-semibold">
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={endDate || today}
            className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700"
          />
        </label>
        <label className="flex items-center gap-2 font-semibold">
          End Date
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            max={today}
            className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700"
          />
        </label>
      </div>
    
      <div className="w-full max-w-full mx-auto">
        {loading ? (
          <Loader />
        ) : (
            <Chart
            startIndex={(page - 1) * displayCount}
            displayCount={displayCount}
            productsData={productsData}
          />
        )}
      </div>

      {/* Pagination and Display Count */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-2 bg-gray-200">
        <button
          onClick={handlePrevProducts}
          disabled={page === 1}
          className={`px-4 py-2 rounded bg-[#22177A] text-white hover:bg-[#605EA1] ${page === 1 ? "disabled:bg-[#8EA3A6] disabled:text-white" : ""}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextProducts}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded bg-[#22177A] text-white hover:bg-[#605EA1] ${page === totalPages ? "disabled:bg-[#8EA3A6] disabled:text-white" : ""}`}
        >
          Next
        </button>

        <select
          value={displayCount}
          onChange={handleLimitChange}
          className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700"
        >
          <option value={5}>5 Products</option>
          <option value={10}>10 Products</option>
          <option value={15}>15 Products</option>
          <option value={20}>20 Products</option>
          <option value={25}>25 Products</option>
          <option value={30}>30 Products</option>
        </select>
      </div>
    </div>
  );
};

export default ChartPage;

import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { fetchProducts } from "../data/productsData";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(20);

  const handleLimitChange = (e) => {
    setDisplayCount(Number(e.target.value));
    setCurrentPage(1)
  };

  const getProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchProducts(page, displayCount);

      if (response.data.success) {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.totalPages);
        setCurrentPage(page);
      } else {
        console.log("Error while fetching data");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts(currentPage, displayCount);
  }, [currentPage, displayCount]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownloadCSV = () => {
    if (!products || products.length === 0) {
      alert("No data available to download.");
      return;
    }
    const headers = ["ID", "Title", "URL", "Today Ranking", "Average Ranking"];

    const csvRows = [
      headers.join(","),
      ...products.map((product) => {
        const productData = product.data || [];
  
        const todayRanking = productData.length > 0 ? productData[productData.length - 1].y : "N/A"; 
        const averageRanking = 
          productData.length > 0 
            ? (productData.reduce((sum, entry) => sum + entry.y, 0) / productData.length).toFixed(2) 
            : "N/A";
  
        return [
          product.id,
          `"${product.title}"`,
          product.url || "N/A",
          product.todayRanking,
          product.averageRanking,
        ].join(",");
      }),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">Products</h2> */}
      <div className="flex justify-end items-center gap-4 mt-2">
  <select
    value={displayCount}
    onChange={handleLimitChange}
    className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700"
  >
    <option value={20}>20 Products</option>
    <option value={50}>50 Products</option>
    <option value={100}>100 Products</option>

  </select>

  <button
    onClick={handleDownloadCSV}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Download CSV
  </button>
</div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <DataTable data={products} setData={setProducts} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2 bg-gray-200 py-1">
            <div className="flex gap-2 items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-white rounded disabled:bg-[#8EA3A6] disabled:text-white bg-[#22177A] text-white hover:bg-[#605EA1]"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-white rounded disabled:bg-[#8EA3A6] disabled:text-white bg-[#22177A] text-white hover:bg-[#605EA1]"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;

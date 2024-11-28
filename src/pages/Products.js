import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { fetchProducts } from "../data/productsData";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchProducts(page);

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
    getProducts(currentPage);
  }, [currentPage]);

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

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">Products</h2> */}
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

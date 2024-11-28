import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <p className="text-xl mt-4">The page you're looking for doesn't exist.</p>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/dashboard/products");
        }}
        className="text-blue-500 hover:underline mt-4"
      >
        Go to Home Page
      </a>
    </div>
  );
}

export default NotFound;


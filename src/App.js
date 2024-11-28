import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ChartPage from "./pages/Chart";
import NotFound from "./pages/404";


function App() {
  return (
    <>
       <Router>
      <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="products" element={<Products />} />
              <Route path="chart" element={<ChartPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard/products" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
      <ToastContainer />
    </>
   
    
  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import ChartPage from "./pages/Chart";
// import NotFound from "./pages/404";
// import Sidebar from "./components/Sidebar";

// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 p-6">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />}>
//               <Route path="products" element={<Products />} />
//               <Route path="chart" element={<ChartPage />} />
//             </Route>
//             <Route path="/" element={<Navigate to="/dashboard/products" />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("orders");
  const [ordersData, setOrdersData] = useState([
    { orderNo: "#15078", date: "June 21, 2024", payment: "Paid", fulfillment: "Fulfilled", total: "₹1,000" },
    { orderNo: "#15079", date: "June 22, 2024", payment: "Pending", fulfillment: "Processing", total: "₹2,500" },
  ]);
  const [accountDetails, setAccountDetails] = useState({
    name: "Aditya Sharma",
    birthdate: "2000-10-10",
    email: "adityasharma10102000@gmail.com",
    phone: "7974507514",
    password: "********",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Effect to handle new order coming from the "Book Now" action
  useEffect(() => {
    if (location.state?.newOrder) {
      const { newOrder } = location.state;
      setOrdersData((prev) => [...prev, newOrder]); // Add new order to the orders list
      navigate(location.pathname, { state: {} }); // Clear the state to avoid duplicate orders
    }
  }, [location.state, navigate]);

  // Function to go to the Invoice page
  const goToInvoicePage = () => {
    const orderDetails = ordersData[ordersData.length - 1]; // Get last added order
    navigate("/invoice", { state: { orderDetails } });
  };

  // Function to go to the Home page
  const goToHomePage = () => {
    navigate("/"); // Navigate to the Home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 flex flex-col items-center text-white">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mt-8">DASHBOARD</h1>

     
      {/* Buttons Section */}
<div className="mt-4 flex gap-4 justify-center flex-wrap">
  {/* View Invoice Button */}
  <button
    onClick={goToInvoicePage}
    className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500"
  >
    View Invoice
  </button>

  {/* Go to Home Button */}
  {/* <button
    onClick={goToHomePage}
    className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500"
  >
    Go to Home
  </button> */}

  {/* Your Orders Button */}
  <button
    onClick={() => setActiveView("orders")}
    className={`px-4 py-2 rounded-md text-sm ${
      activeView === "orders" ? "bg-purple-500" : "bg-purple-600"
    } hover:bg-purple-500`}
  >
    Your Orders
  </button>

  {/* Account Details Button */}
  <button
    onClick={() => setActiveView("accountDetails")}
    className={`px-4 py-2 rounded-md text-sm ${
      activeView === "accountDetails" ? "bg-purple-500" : "bg-purple-600"
    } hover:bg-purple-500`}
  >
    Account Details
  </button>
</div>
      {/* Content Section */}
      <div className="mt-8 w-11/12 md:w-3/4">
        {/* Orders View */}
        {activeView === "orders" && (
          <>
            <h2 className="text-xl font-semibold">Your Orders</h2>
            <table className="w-full mt-4 bg-purple-800 rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-purple-700 text-left">
                  <th className="px-4 py-2">Order No</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Payment Status</th>
                  <th className="px-4 py-2">Fulfillment Status</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order, idx) => (
                  <tr key={idx} className="odd:bg-purple-800 even:bg-purple-700">
                    <td className="px-4 py-2">{order.orderNo}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">{order.payment}</td>
                    <td className="px-4 py-2">{order.fulfillment}</td>
                    <td className="px-4 py-2">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Account Details View */}
        {activeView === "accountDetails" && (
          <>
            <h2 className="text-xl font-semibold">Account Details</h2>
            <div className="mt-4">
              {Object.entries(accountDetails).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

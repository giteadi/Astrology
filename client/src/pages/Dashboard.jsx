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

  useEffect(() => {
    if (location.state?.newOrder) {
      const { newOrder } = location.state;
      setOrdersData((prev) => [...prev, newOrder]);
      navigate(location.pathname, { state: {} });
    }
  }, [location.state, navigate]);

  const goToInvoicePage = () => {
    const orderDetails = ordersData[ordersData.length - 1];
    navigate("/invoice", { state: { orderDetails } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 flex flex-col items-center text-white">
      {/* Dashboard Title */}
      <h1 className="text-2xl md:text-3xl font-bold mt-8 text-center">DASHBOARD</h1>

      {/* Buttons Section */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        <button
          onClick={goToInvoicePage}
          className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500"
        >
          View Invoice
        </button>
        <button
          onClick={() => setActiveView("orders")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeView === "orders" ? "bg-purple-500" : "bg-purple-600"
          } hover:bg-purple-500`}
        >
          Your Orders
        </button>
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
      <div className="mt-8 w-full px-4 sm:px-8 md:w-4/5 lg:w-3/4">
        {/* Orders View */}
        {activeView === "orders" && (
          <>
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Your Orders</h2>

            {/* Table for Larger Screens */}
            <div className="hidden md:block">
              <table className="w-full text-sm md:text-base bg-purple-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-700 text-left text-white">
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
            </div>

            {/* Cards for Mobile Screens */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {ordersData.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-purple-800 p-4 rounded-lg shadow-md text-sm space-y-2"
                >
                  <p>
                    <strong>Order No:</strong> {order.orderNo}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.payment}
                  </p>
                  <p>
                    <strong>Fulfillment:</strong> {order.fulfillment}
                  </p>
                  <p>
                    <strong>Total:</strong> {order.total}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Account Details View */}
        {activeView === "accountDetails" && (
          <>
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Account Details</h2>
            <div className="bg-purple-800 p-4 rounded-lg shadow-md space-y-4 text-sm md:text-base">
              {Object.entries(accountDetails).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

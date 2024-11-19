import React, { useState } from "react";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("orders"); // Default to "Your Orders"
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

  // Form state
  const [formData, setFormData] = useState({
    orderNo: "",
    date: "",
    payment: "",
    fulfillment: "",
    total: "",
  });

  const [accountForm, setAccountForm] = useState(accountDetails);

  // Handle form inputs
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountChange = (e) => {
    setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
  };

  // Add order functionality
  const handleAddOrder = (e) => {
    e.preventDefault();
    setOrdersData([...ordersData, formData]); // Add new order to the list
    setFormData({ orderNo: "", date: "", payment: "", fulfillment: "", total: "" }); // Clear the form
    setActiveView("orders");
  };

  // Update account details
  const handleUpdateAccount = (e) => {
    e.preventDefault();
    setAccountDetails(accountForm);
    setActiveView("accountDetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 flex flex-col items-center text-white">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mt-8">DASHBOARD</h1>

      {/* Buttons Section */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setActiveView("accountDetails")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeView === "accountDetails" ? "bg-purple-500" : "bg-purple-600"
          } hover:bg-purple-500`}
        >
          Account Details
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
          onClick={() => setActiveView("addOrder")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeView === "addOrder" ? "bg-purple-500" : "bg-purple-600"
          } hover:bg-purple-500`}
        >
          Add Order
        </button>
        <button
          onClick={() => setActiveView("updateAccount")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeView === "updateAccount" ? "bg-purple-500" : "bg-purple-600"
          } hover:bg-purple-500`}
        >
          Update Account
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

        {/* Add Order Form */}
        {activeView === "addOrder" && (
          <form onSubmit={handleAddOrder} className="bg-purple-800 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Add Order</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="orderNo"
                value={formData.orderNo}
                onChange={handleFormChange}
                placeholder="Order No"
                className="p-2 rounded-md bg-purple-700 focus:outline-none"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="p-2 rounded-md bg-purple-700 focus:outline-none"
                required
              />
              <input
                type="text"
                name="payment"
                value={formData.payment}
                onChange={handleFormChange}
                placeholder="Payment Status"
                className="p-2 rounded-md bg-purple-700 focus:outline-none"
                required
              />
              <input
                type="text"
                name="fulfillment"
                value={formData.fulfillment}
                onChange={handleFormChange}
                placeholder="Fulfillment Status"
                className="p-2 rounded-md bg-purple-700 focus:outline-none"
                required
              />
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleFormChange}
                placeholder="Total"
                className="p-2 rounded-md bg-purple-700 focus:outline-none"
                required
              />
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500">
              Add Order
            </button>
          </form>
        )}

        {/* Update Account Details Form */}
        {activeView === "updateAccount" && (
          <form onSubmit={handleUpdateAccount} className="bg-purple-800 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Update Account Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(accountForm).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  value={value}
                  onChange={handleAccountChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="p-2 rounded-md bg-purple-700 focus:outline-none"
                  required
                />
              ))}
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500">
              Update Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

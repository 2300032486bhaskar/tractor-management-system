import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* DEMO CHART DATA */
  const chartData = [
    { month: "Jan", revenue: 20000, expense: 8000 },
    { month: "Feb", revenue: 25000, expense: 9000 },
    { month: "Mar", revenue: 18000, expense: 7000 },
    { month: "Apr", revenue: 30000, expense: 11000 },
    { month: "May", revenue: 28000, expense: 10000 },
  ];

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          "http://localhost:8082/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Dashboard fetch failed");
        }

        const result = await res.json();
        setData(result);

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">

      {/* HEADER */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-green-800">
          Dashboard
        </h1>

        <div className="flex gap-3 flex-wrap">

          <NavButton
            label="Search Farmer"
            onClick={() => navigate("/farmers")}
            color="green"
          />

          <NavButton
            label="View Reports"
            onClick={() => navigate("/reports")}
            color="blue"
          />

          <NavButton
            label="Drivers"
            onClick={() => navigate("/drivers")}
            color="blue"
          />

          <NavButton
            label="Expenses"
            onClick={() => navigate("/expenses")}
            color="red"
          />

        </div>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card title="Total Work Value" value={data.totalWorkValue} />
        <Card title="Total Paid" value={data.totalPaid} />
        <Card title="Total Pending" value={data.totalPending} />

        <Card title="Total Expense" value={data.totalExpense} />
        <Card title="Total Profit" value={data.totalProfit} />

        <Card title="Today Collection" value={data.todayCollection} />
        <Card title="This Month Collection" value={data.monthCollection} />
        <Card title="This Year Collection" value={data.yearCollection} />

      </div>

      {/* CHARTS SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Revenue vs Expense Chart */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Revenue vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="revenue" fill="#16a34a" />

              <Bar dataKey="expense" fill="#ef4444" />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

/* SMALL COMPONENTS */

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">

      <h2 className="text-gray-600 text-sm mb-2">
        {title}
      </h2>

      <p className="text-2xl font-bold text-green-700">
        ₹ {value || 0}
      </p>

    </div>
  );
}

function NavButton({ label, onClick, color }) {

  const colors = {
    green: "bg-green-700",
    blue: "bg-blue-700",
    red: "bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-4 py-2 rounded`}
    >
      {label}
    </button>
  );
}
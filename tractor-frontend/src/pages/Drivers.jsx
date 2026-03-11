import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Drivers() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const loadDrivers = async () => {
    const res = await fetch("https://tractor-management-system-0kjw.onrender.com/api/drivers");
    const data = await res.json();
    setDrivers(data);
  };

  const addDriver = async () => {
    if (!name || !mobile) {
      alert("Name & mobile required");
      return;
    }

    const res = await fetch("https://tractor-management-system-0kjw.onrender.com/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        mobile,
        joiningYear: year,
      }),
    });

    if (!res.ok) {
      alert("Driver already exists");
      return;
    }

    setName("");
    setMobile("");
    setShowForm(false);
    loadDrivers();
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Drivers
          </h1>
          <p className="text-gray-600 text-sm">
            Manage tractor drivers
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg shadow"
        >
          {showForm ? "Close Form" : "Add Driver"}
        </button>

      </div>

      {/* ADD DRIVER FORM */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-md">

          <h2 className="text-lg font-semibold mb-4 text-green-800">
            Add New Driver
          </h2>

          <input
            placeholder="Driver Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3 rounded focus:ring focus:ring-green-200"
          />

          <input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-2 w-full mb-3 rounded focus:ring focus:ring-green-200"
          />

          <input
            type="number"
            placeholder="Joining Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 w-full mb-4 rounded focus:ring focus:ring-green-200"
          />

          <button
            onClick={addDriver}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
          >
            Save Driver
          </button>

        </div>
      )}

      {/* DRIVER LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {drivers.map((d) => (
          <div
            key={d._id}
            onClick={() => navigate(`/drivers/${d._id}`)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition border"
          >

            <div className="font-semibold text-lg text-green-800">
              {d.name}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              📞 {d.mobile}
            </div>

            <div className="text-sm text-gray-500">
              Joined {d.joiningYear}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
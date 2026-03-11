import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Farmers() {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");

  const loadFarmers = async () => {
    const res = await fetch("https://tractor-management-system-0kjw.onrender.com/api/farmers");
    const data = await res.json();
    setFarmers(data);
  };

  const searchFarmers = async () => {
    if (!search) {
      loadFarmers();
      return;
    }

    const res = await fetch(`https://tractor-management-system-0kjw.onrender.com/api/farmers/search?q=${search}`);
    const data = await res.json();
    setFarmers(data);
  };

  const addFarmer = async () => {
    if (!name || !mobile) {
      alert("Name and mobile required");
      return;
    }

    const res = await fetch("https://tractor-management-system-0kjw.onrender.com/api/farmers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mobile, village }),
    });

    if (!res.ok) {
      alert("Farmer already exists");
      return;
    }

    setName("");
    setMobile("");
    setVillage("");
    setShowForm(false);

    loadFarmers();
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">

        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Farmers
          </h1>
          <p className="text-gray-600 text-sm">
            Manage farmers and view their work history
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg shadow"
        >
          {showForm ? "Close Form" : "Add Farmer"}
        </button>

      </div>

      {/* ADD FARMER FORM */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-md">

          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Add New Farmer
          </h2>

          <div className="space-y-3">

            <input
              placeholder="Farmer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded focus:ring focus:ring-green-200"
            />

            <input
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-2 w-full rounded focus:ring focus:ring-green-200"
            />

            <input
              placeholder="Village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="border p-2 w-full rounded focus:ring focus:ring-green-200"
            />

            <button
              onClick={addFarmer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Save Farmer
            </button>

          </div>

        </div>
      )}

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search farmer by name or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchFarmers}
          className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-green-200"
        />
      </div>

      {/* FARMERS LIST */}

      {farmers.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No farmers found.
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {farmers.map((f) => (
            <div
              key={f._id}
              onClick={() => navigate(`/farmers/${f._id}`)}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition border"
            >

              <div className="text-lg font-semibold text-green-800">
                {f.name}
              </div>

              <div className="text-sm text-gray-600 mt-1">
                📞 {f.mobile}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                📍 {f.village || "Village not added"}
              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FarmerSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const search = async () => {
    if (!query) return;

    const res = await fetch(
      `http://localhost:8082/api/farmers/search?q=${query}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Farmer</h1>

      <input
        type="text"
        placeholder="Enter name or mobile"
        className="border p-2 w-full mb-3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={search}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="mt-4">
        {results.map((f) => (
          <div
            key={f._id}
            onClick={() => navigate(`/farmer/${f._id}`)}
            className="border p-3 rounded mb-2 cursor-pointer hover:bg-gray-100"
          >
            <p className="font-semibold">{f.name}</p>
            <p className="text-sm text-gray-600">{f.mobile}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

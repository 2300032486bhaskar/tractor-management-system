import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/api/reports/summary")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Monthly Collection" value={data.monthCollection} />
        <Card title="Yearly Collection" value={data.yearCollection} />
        <Card title="Total Work Value" value={data.totalWork} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-6 text-center">
      <h2 className="text-gray-600 mb-2">{title}</h2>
      <p className="text-2xl font-bold text-green-700">
        ₹ {value}
      </p>
    </div>
  );
}

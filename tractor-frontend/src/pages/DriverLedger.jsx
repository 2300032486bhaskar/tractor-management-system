import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DriverLedger() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const loadLedger = async () => {
    const res = await fetch(
      `http://localhost:8082/api/drivers/${id}/ledger`
    );
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadLedger();
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading ledger...
      </div>
    );
  }

  const works = data.works || [];

  return (
    <div className="min-h-screen bg-green-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Driver Ledger
        </h1>

        {/* TOTAL EARNINGS CARD */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <p className="text-gray-500 text-sm">
            Total Earnings
          </p>

          <p className="text-3xl font-bold text-green-700 mt-1">
            ₹ {data.totalEarnings || 0}
          </p>
        </div>

        {/* WORKS TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold text-lg">
              Work History
            </h2>
          </div>

          {works.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No work records found.
            </div>
          ) : (

            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="text-left px-6 py-3">
                    Work Type
                  </th>

                  <th className="text-left px-6 py-3">
                    Acres
                  </th>

                  <th className="text-left px-6 py-3">
                    Farmer
                  </th>

                  <th className="text-right px-6 py-3">
                    Driver Share
                  </th>
                </tr>
              </thead>

              <tbody>

                {works.map((w) => (
                  <tr
                    key={w._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-3">
                      {w.workType}
                    </td>

                    <td className="px-6 py-3">
                      {w.acres} acres
                    </td>

                    <td className="px-6 py-3">
                      {w.farmerId?.name || "N/A"}
                    </td>

                    <td className="px-6 py-3 text-right font-semibold text-green-700">
                      ₹ {w.driverShare || 0}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}
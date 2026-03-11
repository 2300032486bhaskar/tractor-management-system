import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FarmerLedger() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  const [machineName, setMachineName] = useState("");
  const [acres, setAcres] = useState("");
  const [ratePerAcre, setRatePerAcre] = useState("");
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  const [payAmount, setPayAmount] = useState("");
  const [payMode, setPayMode] = useState("cash");
  const [payNotes, setPayNotes] = useState("");

  const loadLedger = async () => {
    const res = await fetch(`https://tractor-management-system-0kjw.onrender.com/api/farmers/${id}/ledger`);
    const json = await res.json();
    setData(json);
  };

  const loadDrivers = async () => {
    const res = await fetch("https://tractor-management-system-0kjw.onrender.com/api/drivers");
    const json = await res.json();
    setDrivers(json);
  };

  useEffect(() => {
    loadLedger();
    loadDrivers();
  }, [id]);

  useEffect(() => {
    const total =
      Number(acres || 0) * Number(ratePerAcre || 0);
    setCalculatedTotal(total);
  }, [acres, ratePerAcre]);

  const addWork = async () => {
    if (!machineName || !acres || !ratePerAcre) {
      alert("Fill all fields");
      return;
    }

    await fetch("https://tractor-management-system-0kjw.onrender.com/api/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerId: id,
        driverId: selectedDriver || null,
        machineName,
        acres: Number(acres),
        ratePerAcre: Number(ratePerAcre),
      }),
    });

    setMachineName("");
    setAcres("");
    setRatePerAcre("");
    setSelectedDriver("");

    loadLedger();
  };

  const addManualPayment = async (modeOverride = null) => {
    if (!payAmount || payAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    await fetch("https://tractor-management-system-0kjw.onrender.com/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerId: id,
        amount: Number(payAmount),
        mode: modeOverride || payMode,
        notes: payNotes,
      }),
    });

    setPayAmount("");
    setPayNotes("");

    loadLedger();
  };

  const handleRazorpay = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    if (!payAmount || payAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    const orderRes = await fetch("https://tractor-management-system-0kjw.onrender.com/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(payAmount),
        }),
      }
    );

    const order = await orderRes.json();

    const options = {
      key: "rzp_test_SEiQOKUxVt2o0U",
      amount: order.amount,
      currency: "INR",
      name: "Tractor Service",
      description: "Farmer Payment",
      order_id: order.id,
      handler: async function () {
        await addManualPayment("razorpay");
        alert("Payment Successful");
      },
      theme: { color: "#16a34a" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const deleteWork = async (workId) => {
    if (!window.confirm("Delete this work?")) return;

    await fetch(`https://tractor-management-system-0kjw.onrender.com/api/works/${workId}`, {
      method: "DELETE" }
    );

    loadLedger();
  };

  const deletePayment = async (paymentId) => {
    if (!window.confirm("Delete this payment?")) return;

    await fetch(`https://tractor-management-system-0kjw.onrender.com/api/payments/${paymentId}`, {
       method: "DELETE" }
    );

    loadLedger();
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-green-50 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-green-800 mb-6">
          {data.farmer.name} – Ledger
        </h1>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <SummaryCard
            title="Total Work"
            value={data.totalWork}
          />

          <SummaryCard
            title="Total Paid"
            value={data.totalPaid}
          />

          <SummaryCard
            title="Pending"
            value={data.pending}
          />

        </div>

        {/* RISK + CREDIT */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-sm text-gray-600">
              Risk Score
            </h2>
            <p className="text-xl font-bold">
              {data.riskScore} ({data.riskCategory})
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-sm text-gray-600">
              Credit Limit
            </h2>
            <p className="text-xl font-bold">
              ₹ {data.creditLimit}
            </p>
          </div>

        </div>

        {/* ADD WORK */}
        <Section title="Add Machine Work">

          <div className="grid md:grid-cols-5 gap-3">

            <input
              placeholder="Machine"
              value={machineName}
              onChange={(e) =>
                setMachineName(e.target.value)
              }
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Acres"
              value={acres}
              onChange={(e) =>
                setAcres(e.target.value)
              }
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Rate"
              value={ratePerAcre}
              onChange={(e) =>
                setRatePerAcre(e.target.value)
              }
              className="border p-2 rounded"
            />

            <select
              value={selectedDriver}
              onChange={(e) =>
                setSelectedDriver(e.target.value)
              }
              className="border p-2 rounded"
            >
              <option value="">Driver</option>

              {drivers.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}

            </select>

            <button
              onClick={addWork}
              className="bg-green-600 text-white rounded"
            >
              Add
            </button>

          </div>

          <p className="mt-2 text-sm font-semibold">
            Total: ₹ {calculatedTotal}
          </p>

        </Section>

        {/* WORKS */}
        <Section title="Works">

          {data.works.length === 0 && (
            <p>No work added</p>
          )}

          {data.works.map((w) => (
            <Row
              key={w._id}
              left={`${w.machineName} – ${w.acres} acres`}
              right={`₹ ${w.totalAmount}`}
              onDelete={() =>
                deleteWork(w._id)
              }
            />
          ))}

        </Section>

        {/* ADD PAYMENT */}
        <Section title="Add Payment">

          <input
            type="number"
            placeholder="Amount"
            value={payAmount}
            onChange={(e) =>
              setPayAmount(e.target.value)
            }
            className="border p-2 w-full mb-2 rounded"
          />

          <select
            value={payMode}
            onChange={(e) =>
              setPayMode(e.target.value)
            }
            className="border p-2 w-full mb-2 rounded"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank</option>
          </select>

          <input
            placeholder="Notes"
            value={payNotes}
            onChange={(e) =>
              setPayNotes(e.target.value)
            }
            className="border p-2 w-full mb-4 rounded"
          />

          <div className="flex gap-3">

            <button
              onClick={() =>
                addManualPayment()
              }
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Payment
            </button>

            <button
              onClick={handleRazorpay}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Razorpay
            </button>

          </div>

        </Section>

        {/* PAYMENTS */}
        <Section title="Payments">

          {data.payments.length === 0 && (
            <p>No payments yet</p>
          )}

          {data.payments.map((p) => (
            <Row
              key={p._id}
              left={`₹${p.amount} – ${p.mode}`}
              right={new Date(
                p.date
              ).toLocaleDateString()}
              link={`https://tractor-management-system-0kjw.onrender.com/api/payments/receipt/${p._id}`}
              onDelete={() =>
                deletePayment(p._id)
              }
            />
          ))}

        </Section>

      </div>

    </div>
  );
}

/* SMALL COMPONENTS */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-sm text-gray-600">
        {title}
      </h2>
      <p className="text-xl font-bold">
        ₹ {value}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="font-semibold mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ left, right, link, onDelete }) {
  return (
    <div className="flex justify-between border-b py-2">

      <span>{left}</span>

      <div className="flex gap-4">

        {link && (
          <a
            href={link}
            target="_blank"
            className="text-blue-600"
          >
            PDF
          </a>
        )}

        <button
          onClick={onDelete}
          className="text-red-600"
        >
          Delete
        </button>

        <span className="font-semibold">
          {right}
        </span>

      </div>

    </div>
  );
}
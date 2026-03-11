import { useEffect, useState } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("diesel");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const loadExpenses = async () => {
    const res = await fetch("http://localhost:8082/api/expenses");
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const addExpense = async () => {
    if (!category) {
      alert("Select category");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    await fetch("http://localhost:8082/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        amount: Number(amount),
        notes,
      }),
    });

    setAmount("");
    setNotes("");
    setCategory("diesel");
    loadExpenses();
  };

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:8082/api/expenses/${id}`, {
      method: "DELETE",
    });

    loadExpenses();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Expense Management</h1>

      {/* ADD EXPENSE */}
      <div className="bg-gray-100 p-4 rounded mb-6">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="diesel">Diesel</option>
          <option value="maintenance">Maintenance</option>
          <option value="repair">Repair</option>
          <option value="salary">Salary</option>
          <option value="emi">EMI</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={addExpense}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* LIST */}
      {expenses.map((e) => (
        <div
          key={e._id}
          className="flex justify-between border-b py-2"
        >
          <span>
            ₹{e.amount} — {e.category} — {e.notes}
          </span>
          <button
            onClick={() => deleteExpense(e._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
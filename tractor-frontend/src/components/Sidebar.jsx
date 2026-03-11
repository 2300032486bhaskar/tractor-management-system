import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const linkStyle =
    "block px-4 py-2 rounded hover:bg-green-600 transition";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-4 flex flex-col justify-between">

      <div>

        <h1 className="text-xl font-bold mb-6">
          🚜 Tractor Admin
        </h1>

        <nav className="space-y-2">

          <NavLink to="/dashboard" className={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/farmers" className={linkStyle}>
            Farmers
          </NavLink>

          <NavLink to="/drivers" className={linkStyle}>
            Drivers
          </NavLink>

          <NavLink to="/reports" className={linkStyle}>
            Reports
          </NavLink>

          <NavLink to="/expenses" className={linkStyle}>
            Expenses
          </NavLink>
        <NavLink to="/inspection" className={linkStyle}>
 Machine Inspection
</NavLink>
        </nav>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}
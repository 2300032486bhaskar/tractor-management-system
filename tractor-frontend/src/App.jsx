import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import MachineInspection from "./pages/MachineInspection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import FarmerLedger from "./pages/FarmerLedger";
import Drivers from "./pages/Drivers";
import DriverLedger from "./pages/DriverLedger";
import Reports from "./pages/Reports";
import Expenses from "./pages/Expenses";

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drivers"
        element={
          <ProtectedRoute>
            <Layout>
              <Drivers />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drivers/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <DriverLedger />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmers"
        element={
          <ProtectedRoute>
            <Layout>
              <Farmers />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmers/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <FarmerLedger />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
 path="/inspection"
 element={
  <ProtectedRoute>
   <Layout>
    <MachineInspection/>
   </Layout>
  </ProtectedRoute>
 }
/>

      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Layout>
              <Expenses />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
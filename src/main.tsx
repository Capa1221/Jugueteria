import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPages";
import InventoryPage from "./Pages/InventoryPage";
import SalesPage from "./Pages/SalesPage"; // Importa la página de ventas
import Sidebar from "./Components/Sidebar";
import AdminPanel from "./Pages/AdminPanel";
import "./index.css";

const App = () => {
  // Estado para rastrear si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsAuthenticated(true); // Establece el estado como autenticado
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false); // Establece el estado como no autenticado
  };

  return (
    <div className="flex h-screen">
      <BrowserRouter>
        {/* Muestra el Sidebar solo si el usuario está autenticado */}
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="flex-1">
          <Routes>
            {/* Ruta principal (Login o redirección al Panel de Administración si está autenticado) */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" /> // Redirige al panel si ya está autenticado
                ) : (
                  <LoginPage onLogin={handleLogin} /> // Muestra la página de Login
                )
              }
            />
            {/* Ruta de Inventario (solo accesible si el usuario está autenticado) */}
            <Route
              path="/inventory"
              element={
                isAuthenticated ? (
                  <InventoryPage /> // Muestra la página de inventario
                ) : (
                  <Navigate to="/" /> // Redirige al login si no está autenticado
                )
              }
            />
            {/* Ruta de Ventas (solo accesible si el usuario está autenticado) */}
            <Route
              path="/sales"
              element={
                isAuthenticated ? (
                  <SalesPage /> // Muestra la página de ventas
                ) : (
                  <Navigate to="/" /> // Redirige al login si no está autenticado
                )
              }
            />
            {/* Ruta del Panel de Administración (solo accesible si el usuario está autenticado) */}
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPanel /> // Muestra el panel de administración
                ) : (
                  <Navigate to="/" /> // Redirige al login si no está autenticado
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

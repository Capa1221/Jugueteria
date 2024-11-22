import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Box, DollarSign, LogOut } from "lucide-react";

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // Estado para abrir/cerrar el sidebar

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  // Función para alternar el estado del sidebar al hacer clic
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "w-48" : "w-20"
      } min-h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden shadow-lg fixed z-30 left-0 top-0 cursor-pointer`}
      onClick={toggleSidebar} // Hace que el sidebar se contraiga/expanda al hacer clic
    >
      {/* Título del sidebar */}
      <h1
        className={`text-xl font-semibold p-6 border-b border-gray-700 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        Gestor de Juguetería
      </h1>

      {/* Contenido de navegación */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-3 p-4">
          <li>
            <Link
              to="/admin"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Box className="w-5 h-5" />
              {isOpen && <span>Inventario</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/sales"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <DollarSign className="w-5 h-5" />
              {isOpen && <span>Ventas</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Botón para cerrar sesión */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5 inline-block mr-2" />
          {isOpen && "Cerrar Sesión"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

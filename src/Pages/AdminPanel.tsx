import React from "react";
import { Line } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AiOutlineDownload } from "react-icons/ai";
import { FaShoppingCart, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminPanel = () => {
  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ventas (en miles)",
        data: [12, 19, 10, 15, 22, 30],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ventas Mensuales",
      },
    },
  };

  const excelData = [
    { Mes: "Enero", Ventas: 12000 },
    { Mes: "Febrero", Ventas: 19000 },
    { Mes: "Marzo", Ventas: 10000 },
    { Mes: "Abril", Ventas: 15000 },
    { Mes: "Mayo", Ventas: 22000 },
    { Mes: "Junio", Ventas: 30000 },
  ];

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    XLSX.writeFile(workbook, "ventas.xlsx");
  };

  return (
    <div className="flex">
      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen ml-48"> {/* Ajuste con ml-48 para dejar espacio para el Sidebar */}
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleDownloadExcel}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
          >
            <AiOutlineDownload className="w-<5 h-5 mr-2" />
            Descargar Excel
          </button>
        </div>

        {/* Filtro de Fecha */}
        <div className="mb-8">
          <label htmlFor="date-range" className="text-lg sm:text-xl font-semibold text-gray-600">Seleccionar Rango de Fechas</label>
          <div className="flex space-x-4 mt-4">
            <input
              type="date"
              id="start-date"
              className="p-2 sm:p-3 border border-gray-300 rounded-lg w-1/2"
            />
            <input
              type="date"
              id="end-date"
              className="p-2 sm:p-3 border border-gray-300 rounded-lg w-1/2"
            />
          </div>
        </div>

        {/* KPI's */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm sm:text-base font-semibold">Ventas Totales</h2>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">$120,000</p>
            </div>
            <FaDollarSign className="text-green-500 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm sm:text-base font-semibold">Pedidos</h2>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">450</p>
            </div>
            <FaShoppingCart className="text-blue-500 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm sm:text-base font-semibold">Clientes</h2>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">320</p>
            </div>
            <FaUsers className="text-orange-500 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm sm:text-base font-semibold">Ingresos Mensuales</h2>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">$25,000</p>
            </div>
            <FaChartLine className="text-purple-500 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Gráficos y Tabla de Ventas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Gráfico de Ventas */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Gráfico de Ventas</h2>
            <div className="h-56 sm:h-64">
              <Line data={data} options={options} />
            </div>
          </div>

          {/* Tabla de Ventas Recientes */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Ventas Recientes</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 sm:px-6 py-3 text-left text-lg font-semibold text-gray-600">Mes</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-lg font-semibold text-gray-600">Ventas</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-lg font-semibold text-gray-600">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 text-gray-700">{item.Mes}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700">${item.Ventas.toLocaleString()}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700">{new Date().toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

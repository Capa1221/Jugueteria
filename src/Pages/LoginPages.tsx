import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import LoginForm from "../Components/LoginForm";

interface LoginPageProps {
  onLogin: () => void; // Prop para manejar el login exitoso
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    // Validación de las credenciales
    if (email === "admin@jugueteria.com" && password === "admin123") {
      setError(null);
      onLogin(); // Llama a la función pasada desde App.tsx
    } else {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-full sm:w-96 shadow-lg rounded-xl bg-white p-6 md:p-8">
        <CardBody className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Gestor de Juguetería
          </h1>

          {/* Mensaje de error si las credenciales son incorrectas */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Usando el LoginForm */}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;

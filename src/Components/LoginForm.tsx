import { Input, Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface LoginFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onLogin: () => void;
}

const LoginForm = ({ email, setEmail, password, setPassword, onLogin }: LoginFormProps) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md border border-gray-300 px-4 py-2 transition duration-200"
        />
      </div>
      <div className="space-y-4">
        <Input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md border border-gray-300 px-4 py-2 transition duration-200"
        />
      </div>
      <Button
        type="submit"
        color="primary"
        className="w-full py-3 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        Ingresar
      </Button>
    </form>
  );
};

export default LoginForm;

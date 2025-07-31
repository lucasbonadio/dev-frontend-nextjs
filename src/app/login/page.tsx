"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
// import Cookies from "js-cookie"; // 1. Remova a importação da biblioteca

export default function LoginPage() {
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ username, password });
      
      // 2. Substitua a criação do cookie pela forma nativa
      const date = new Date();
      // Define a expiração para 1 dia a partir de agora
      date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      // Define o cookie com o token, data de expiração e caminho raiz
      document.cookie = `token=${response.token};${expires};path=/`;

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro desconhecido."
      );
    } finally {
      setLoading(false);
    }
  };

  // ... O resto do seu componente (o JSX do formulário) não muda ...
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
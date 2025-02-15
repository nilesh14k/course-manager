"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Loading from "../components/Loading";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Logging in..." />;
  }

  return (
    <div className="min-h-screen bg-black text-beige flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-black border border-beige p-6 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <FaUser className="h-16 w-16 text-beige" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <p className="text-gray-400 text-sm mb-6">Welcome back! Log in to continue.</p>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 pl-10 border border-beige rounded-lg bg-black text-beige focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pl-10 border border-beige rounded-lg bg-black text-beige focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-beige text-black py-3 rounded-lg font-semibold hover:bg-beige/80 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-beige font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Loading from "../components/Loading";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(email, password, name);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Signing up..." />;
  }

  return (
    <div className="min-h-screen bg-black text-beige flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-black border border-beige p-6 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-beige"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
        <p className="text-gray-400 text-sm mb-6">Join us today and start learning!</p>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 pl-10 border border-beige rounded-lg bg-black text-beige focus:outline-none"
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-beige font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

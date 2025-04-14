"use client";

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const { register } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(formData);
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0e5ec]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#e0e5ec] p-8 rounded-3xl shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff]"
      >
        <h1
          className="text-center text-4xl mb-4 text-blue-600"
          style={{ fontFamily: "var(--font-pacifico)" }}
        >
          BlueHost
        </h1>

        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Register
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {["username", "email", "password"].map((field) => (
            <div key={field}>
              <input
                name={field}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#e0e5ec] text-gray-800 border border-[#c9d1da] rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
              />
            </div>
          ))}

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-500 transition-all duration-300 font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

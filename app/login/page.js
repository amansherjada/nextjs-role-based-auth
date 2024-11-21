"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";  // Import the useRouter hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    psw: "",
    remember: false,
  });
  const [error, setError] = useState(""); // For showing error message
  const router = useRouter(); // Initialize useRouter for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send a POST request to the login API
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.psw,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Successful login, redirect based on user role
      if (data.role === "admin") {
        router.push("/admin"); // Redirect to admin page
      }else {
        router.push("/user"); // Redirect to homepage
      } 
    } else {
      // Handle errors (incorrect credentials or other issues)
      setError(data.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#e4a0ff] to-[#aa01ff]">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-semibold mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="psw" className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                value={formData.psw}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>} {/* Display error message */}

            <button
              type="submit"
              className="w-full bg-[#9849C1] text-white py-3 rounded hover:opacity-70 mt-4"
            >
              Login
            </button>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="text-sm">Remember me</label>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Link href="/register" className="text-blue-500 hover:underline">Register Now</Link>
              <Link href="#" className="text-blue-500 hover:underline">Forgot password?</Link>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Media Login Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded text-sm font-semibold text-white bg-[#9849C1] hover:opacity-70">
              Login With Facebook
            </button>
            <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded text-sm font-semibold text-white bg-[#9849C1] hover:opacity-70">
              Login with Google
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 relative">
          <Image
            src="/loginimg.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
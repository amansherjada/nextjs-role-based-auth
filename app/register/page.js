"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const Register = () => {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    psw: "",
    confirmPsw: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Initialize the router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.psw !== formData.confirmPsw) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.uname,
          email: formData.email,
          password: formData.psw,
          role: formData.role,
        }),
      });

      if (response.status === 201) {
        setSuccess("User registered successfully!");
        setTimeout(() => {
          router.push("/login"); // Redirect to the login page after success
        }, 1000); // Optional delay to show success message
      } else if (response.status === 409) {
        setError("User already exists with this email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error in registration:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#6990df] to-[#1265e1]">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Register Form */}
        <div className="w-1/2 p-6">
          <h2 className="text-center text-2xl font-bold mb-2">Register</h2>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          {success && <p className="text-green-500 text-center mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="uname" className="block font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="role" className="block font-semibold mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div>
              <label htmlFor="psw" className="block font-semibold mb-2">
                Password
              </label>
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

            <div>
              <label htmlFor="confirmPsw" className="block font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPsw"
                value={formData.confirmPsw}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1247b2] text-white py-3 rounded hover:opacity-70 mt-4"
            >
              Register
            </button>

            <div className="flex justify-between items-center mt-4">
              <Link href="/login" className="text-blue-500 hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 relative bg-image">
          <Image
            src="/signupimg.jpg"
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

export default Register;
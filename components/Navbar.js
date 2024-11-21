'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const DynamicNavbar = () => {
    const [role, setRole] = useState(null); // Track user role
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const router = useRouter();

    // Fetch user role and login state on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    const data = await response.json();
                    setRole(data.role);
                    setIsLoggedIn(true);
                } else {
                    setRole(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setRole(null);
                setIsLoggedIn(false);
            }
        };
        fetchUser();
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                setIsLoggedIn(false);
                setRole(null);
                router.push('/login'); // Redirect to login page
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <nav className="navbar fixed top-5 left-1/2 transform -translate-x-1/2 w-5/6 flex justify-between items-center py-3 bg-gray-900 text-white z-10 rounded-2xl md:flex-row flex-col">
                {/* Logo Section */}
                <div className="md:ml-3 ml-0">
                    <Link href="/">
                        <Image src="/logo.png" height={150} width={150} alt="Logo" />
                    </Link>
                </div>

                {/* Dynamic Links */}
                <ul className="nav-links flex items-center space-x-4 mx-3 md:mt-0 mt-5">
                    <li>
                        <Link href="/" className="hover:text-orange-700 transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-[#da135f] transition duration-300">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-[#ffae00] transition duration-300">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:text-[#d6bf6a] transition duration-300">
                            Blog
                        </Link>
                    </li>

                    {/* Role-Specific Links */}
                    {role === 'admin' && (
                        <li>    
                            <Link
                                href="/admin"
                                className="bg-white hover:bg-[#16a34a] text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Admin Panel
                            </Link>
                        </li>
                    )}
                    {role === 'user' && (
                        <li>
                            <Link
                                href="/user"
                                className="bg-white hover:bg-[#16a34a] text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                User Dashboard
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Action Buttons */}
                <ul className="nav-actions flex space-x-4 mx-3 md:mt-0 mt-5">
                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link
                                    href="/register"
                                    className="bg-white hover:bg-[#1265e1] text-black font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="bg-white hover:bg-orange-700 text-black font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-white hover:bg-red-700 text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default DynamicNavbar;
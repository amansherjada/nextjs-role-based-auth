'use client'; // Enables client-side interactivity
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const AdminUserNavbar = () => {
    const [role, setRole] = useState(null);
    const router = useRouter();

    // Fetch the user's role
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                });

                const data = await response.json();
                setRole(data.role);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
        fetchRole();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                router.push('/login'); // Redirect to login page after logout
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
                <Link href={"/"}><Image src="/logo.png" height={150} width={150} alt="Logo"/></Link>
                </div>

                {/* Role-Specific Button */}
                <ul className="nav-links flex items-center space-x-4 mx-3 md:mt-0 mt-5">
                    {role === 'admin' && (
                        <li>
                            <a
                                href="/admin"
                                className="bg-white hover:bg-[#16a34a] text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Admin
                            </a>
                        </li>
                    )}
                    {role === 'user' && (
                        <li>
                            <a
                                href="/user"
                                className="bg-white hover:bg-[#16a34a] text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                User
                            </a>
                        </li>
                    )}

                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-white hover:bg-red-700 text-black font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminUserNavbar;
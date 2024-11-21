'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
    const [role, setRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}), // Empty body for session validation
            });

            const data = await response.json();
            setRole(data.role);

            // Redirect if not user
            if (data.role !== 'user') {
                router.push('/');
            }
        };
        fetchRole();
    }, [router]);

    if (role === null) {
        return <div>Loading...</div>; // While role is loading
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">User  Page</h1>
            <p className="text-xl text-gray-600 mb-6">Welcome, User! Here’s your personalized dashboard.</p>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Information</h2>
                <p className="text-gray-500 mb-4">Here you can manage your account settings and preferences.</p>
                <p className="text-gray-500 mb-4">Stay updated with the latest news and offers.</p>
                <div className='flex justify-between'>
                    <button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-3 rounded hover:bg-blue-700 transition duration-200">
                        Update Profile
                    </button>
                    <button className="mt-4 bg-green-600 text-white font-semibold py-2 px-3 rounded hover:bg-green-700 transition duration-200">
                        View Notifications
                    </button>
                </div>
            </div>
        </div>
    );
}
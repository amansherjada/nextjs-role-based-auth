'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DynamicNavbar from '@/components/Navbar';

export default function AdminLayout({ children }) {
    const [role, setRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}), // Empty body for session validation
                });

                const data = await response.json();
                setRole(data.role);

                if (data.role !== 'admin') {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching role:', error);
                router.push('/login');
            }
        };
        fetchRole();
    }, [router]);

    if (role === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-black" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (role !== 'admin') {
        return <div>Unauthorized</div>; // Fallback if the redirect doesn't work
    }

    return (
        <div>
            <DynamicNavbar />
            <main>{children}</main>
        </div>
    );
}
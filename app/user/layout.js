'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminUserNavbar from '@/components/AdminUserNavbar';
import DynamicNavbar from '@/components/Navbar';

export default function UserLayout({ children }) {
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

                if (data.role !== 'user') {
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
        return <div>Loading...</div>; // Show a loader while fetching
    }

    if (role !== 'user') {
        return <div>Unauthorized</div>; // Fallback if the redirect doesn't work
    }

    return (
        <div>
            <DynamicNavbar />
            <main>{children}</main>
        </div>
    );
}
'use client';
import { useEffect, useState } from 'react';

export default function AdminTable() {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                });

                const data = await response.json();
                setRole(data.role);

                if (data.role == 'admin') {
                    const userResponse = await fetch('/api/users');
                    const userData = await userResponse.json();
                    setUsers(userData);
                }
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch('/api/users/updateRole', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, newRole }),
            });

            const result = await response.json();
            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, role: newRole } : user
                    )
                );
            } else {
                console.error('Failed to update role:', result.message);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    if (role === null) {
        return <div>Loading...</div>;
    }

    if (role !== 'admin') {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="flex justify-center h-screen py-20">
            <div className="w-3/4 bg-white rounded-lg shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Email</th>
                            <th className="px-4 py-2 border border-gray-300">Role</th>
                            <th className="px-4 py-2 border border-gray-300">Created</th>
                            <th className="px-4 py-2 border border-gray-300">Update Role</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border border-gray-300">
                                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">{user.created}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
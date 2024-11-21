import db from "@/lib/db"; // Import the db object

export async function GET(req) {
    try {
        // Extract session cookie
        const cookies = req.headers.get("cookie");
        const sessionId = cookies?.split("; ").find((c) => c.startsWith("auth_session="))?.split("=")[1];
        
        // Correctly access the query method from the db pool
        const [users] = await db.db.query('SELECT id, email, role, created FROM users'); // Use db.db.query for accessing pool
        
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
    }
}
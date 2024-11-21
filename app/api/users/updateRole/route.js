import db from "@/lib/db";

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, newRole } = body;

        // Debugging: Log the received request body
        console.log("Received request body:", { userId, newRole });

        // Validate input
        if (!userId || !newRole) {
            console.error("Validation failed: Missing userId or newRole");
            return new Response(JSON.stringify({ message: "Invalid request: Missing userId or newRole" }), { status: 400 });
        }

        // Update the role in the database
        console.log("Updating user role in database...");
        const result = await db.db.query("UPDATE users SET role = ? WHERE id = ?", [newRole, userId]);

        // Debugging: Log the result of the database operation
        console.log("Database operation result:", result);

        return new Response(JSON.stringify({ message: "Role updated successfully" }), { status: 200 });
    } catch (error) {
        // Log the error for troubleshooting
        console.error("Error updating role:", error);

        // Return a proper error response
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
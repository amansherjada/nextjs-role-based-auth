import { lucia } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req) {
  try {
    // Extract session cookie
    const cookies = req.headers.get("cookie");
    const sessionId = cookies?.split("; ").find((c) => c.startsWith("auth_session="))?.split("=")[1];

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "No session found" }),
        { status: 400 }
      );
    }

    // Check if the session is valid
    const session = await lucia.getUserSessions(sessionId);

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session expired or invalid" }),
        { status: 401 }
      );
    }

    // Update the session status to "active" in the database if the session is still valid
    const isExpired = new Date(session.expires) < new Date();

    if (isExpired) {
      // If the session is expired, update the status to "expired" in the database
      await db.db.query(
        "UPDATE sessions SET status = ? WHERE id = ?",
        ["expired", sessionId]
      );

      return new Response(
        JSON.stringify({ message: "Session expired" }),
        { status: 401 }
      );
    }

    // If the session is still active, update the status to "active" in the database
    await db.db.query(
      "UPDATE sessions SET status = ? WHERE id = ?",
      ["active", sessionId]
    );

    // Proceed with the logout logic, updating the status to "expired" when logging out
    await db.db.query(
      "UPDATE sessions SET status = ? WHERE id = ?",
      ["expired", sessionId]
    );

    // Invalidate the session on logout
    await lucia.invalidateSession(sessionId);

    // Respond with success
    return new Response(
      JSON.stringify({ success: true, message: "Logged out successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to handle session" }),
      { status: 500 }
    );
  }
}
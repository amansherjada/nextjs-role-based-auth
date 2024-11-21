import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import query from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (email && password) {
            // Handle login
            const existing_user = await query.users.get_by_email(email);
            if (!existing_user) {
                return new Response("User does not exist!", {
                    status: 404,
                });
            }

            const valid_pass = await bcrypt.compare(password, existing_user.password);
            if (!valid_pass) {
                return new Response("Password does not match!", {
                    status: 401,
                });
            }

            const session = await lucia.createSession(existing_user.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);

            // Await the cookies() call
            const cookieStore = await cookies();
            await cookieStore.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );

            return new Response(
                JSON.stringify({
                    message: "User logged in successfully!",
                    role: existing_user.role,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            // Validate existing session
            const cookieStore = await cookies(); // Await cookies()
            const sessionId = cookieStore.get("auth_session")?.value;

            if (!sessionId) {
                return new Response(
                    JSON.stringify({ error: "Unauthorized", role: null }),
                    { status: 401, headers: { "Content-Type": "application/json" } }
                );
            }

            const session = await lucia.validateSession(sessionId);
            if (!session) {
                return new Response(
                    JSON.stringify({ error: "Unauthorized", role: null }),
                    { status: 401, headers: { "Content-Type": "application/json" } }
                );
            }

            const user = session.user;
            return new Response(
                JSON.stringify({
                    message: "Session validated successfully!",
                    role: user.role,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.error("Login API error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
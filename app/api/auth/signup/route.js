import bcrypt from "bcrypt";
import auth from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    // Check if the email already exists in the database
    const [rows] = await db.db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) { // Ensure rows is an array and check if it has any elements
      console.log("User exists with email:", email);
      return new Response("User already exists!", { status: 409 });
    }

    // Generate a unique user ID
    const userId = crypto.randomUUID();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert new user into the database
    await db.db.query(
      "INSERT INTO users (id, name, email, password, role, created) VALUES (?, ?, ?, ?, ?, NOW())",
      [userId, name, email, hashedPassword, role || "user"] // Default role to "user" if not provided
    );

    console.log("User created successfully:", { userId, name, email }); // Debugging log
    return new Response("User created successfully!", { status: 201 });
  } catch (error) {
    console.error("Error in signup:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

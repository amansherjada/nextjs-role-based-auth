import { Lucia } from "lucia";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import db from "./db"; // Import your database connection

const adapter = new Mysql2Adapter(db.db, {
  user: "users", // Table for user data
  session: "sessions" // Table for session data
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name,
      email: attributes.email,
      role: attributes.role,
      created: attributes.created,
    };
  }
});
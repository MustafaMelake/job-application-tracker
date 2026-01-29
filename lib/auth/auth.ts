import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import connectDB from "../db";

const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    // في ملف auth.ts
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            try {
              await initializeUserBoard(user.id);
            } catch (error) {
              console.error(
                "Board creation failed but user was created:",
                error
              );
            }
          }
        },
      },
    },
  },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });
  return result;
}
export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  if (result.success) {
    redirect("/sign-in");
  }
  return result;
}

"use server";

import { createUser, FormState, getUserByEmail } from "@/lib/user";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { createAuthSession, destroyAuthSession } from "@/lib/auth";

export async function signup(prevState: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Your signup logic here
  const errors: { [key: string]: string } = {};

  if (!email?.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password || password.trim().length < 6) {
    errors.password = "Please enter a valid password";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  const hashedPassword = hashUserPassword(password);
  try {
    const userId = await createUser(email, hashedPassword);
    await createAuthSession(userId.toString());
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      errors.email = "Email already exists";
      return { errors };
    }
    // throw error;
  }
  redirect("/training");
}

export async function login(prevState: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user , please check your credentials",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user , please check your credentials",
      },
    };
  }

  await createAuthSession(existingUser.id.toString());
  redirect("/training");
}

export async function auth(
  mode: string,
  prevState: FormState,
  formData: FormData
) {
  if (mode === "login") {
    return await login(prevState, formData);
  } else if (mode === "signup") {
    return await signup(prevState, formData);
  }
}

export async function logout() {
  await destroyAuthSession();
  redirect("/");
}
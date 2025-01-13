"use server";

import { createUser, FormState } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/auth";

export async function signup(
  prevState: FormState,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Your signup logic here
  let errors: { [key: string]: string } = {};

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
    console.log(error);
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
  redirect('/training');
}
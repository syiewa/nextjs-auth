"use client";

import Link from "next/link";
import Image from "next/image";

import { auth } from "@/actions/auth-action";
import { useActionState } from "react";

import { FormState } from "@/lib/user";

export default function AuthForm({mode}: {mode: string}) {
  const initialState: FormState = {};
  const [formState, formAction] = useActionState<FormState, FormData>(
    async (state, formData) => {
      const result = await auth(mode, state, formData);
      return result || {};
    },
    initialState
  );
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image
          src="/images/auth-icon.jpg"
          alt="A lock icon"
          width={200}
          height={200}
        />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>
              {String(
                formState.errors?.[error as keyof typeof formState.errors]
              )}
            </li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit" className="mt-4">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account</Link>
        )}
      </p>
    </form>
  );
}

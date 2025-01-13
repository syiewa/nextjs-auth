"use client";

import Link from "next/link";
import Image from "next/image";

import { signup } from "@/actions/auth-action";
import { useActionState } from "react";

import { FormState } from "@/lib/user";

export default function AuthForm() {
  const initialState: FormState = {};
  const [formState, formAction] = useActionState<FormState, FormData>(
    signup,
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
          Create Account
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}

import db from "./db";

export interface FormState {
  errors?: { [key: string]: string };
  success?: boolean;
}

export function createUser(email: string, password: string) {
  // Your user creation logic here
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);
  return result.lastInsertRowid;
}

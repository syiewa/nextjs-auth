import db from "./db";

export interface FormState {
  errors?: { [key: string]: string };
  success?: boolean;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export function createUser(email: string, password: string) {
  // Your user creation logic here
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);
  return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
  // Your user retrieval logic here
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  return user as User;
}

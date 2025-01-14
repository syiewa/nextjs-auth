import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface FormState {
  errors?: { [key: string]: string };
  success?: boolean;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export async function createUser(email: string, password: string) {
  // Your user creation logic here
  const { data, error } = await supabase.from('users').insert({
    email,
    password,
  }).select();
  if (error) {
    throw error;
  }
  return data[0].id;
  // const result = db
  //   .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
  //   .run(email, password);
//   return result.lastInsertRowid;
}

export async function getUserByEmail(email: string) {
  // Your user retrieval logic here
  const {data, error} = await supabase.from('users').select().eq('email', email);
  
  if(error) {
    throw error;
  }
  return data[0] as User;
}

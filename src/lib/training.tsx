import db from './db';

export interface Trainings {
  id: string;
  image: string;
  title: string;
  description: string;
}

export async function getTrainings() {
  const stmt = db.prepare('SELECT * FROM trainings');
  const result = stmt.all();
  return result as  Trainings[];
}

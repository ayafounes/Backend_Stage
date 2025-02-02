// DoctorService.ts
import { db } from '../db/connexion';
import { eq } from 'drizzle-orm';
import { doctor, secretary} from '../schema/UserSchema';


export class DoctorService {
  async getAllDoctors() {
    return await db.select().from(doctor);
  }

  async getDoctorById(id: number) {
    return await db.select().from(doctor).where(eq(doctor.id, id.toString()));
  }

  async addDoctor(data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    country: string;
    username: string;
    password: string;
    postalCode: string;
    profilePhoto?: string;
  }): Promise<any> {
    try {
      // Hash the password before inserting
  
      const doctorData = {
        ...data,
        role: 'doctor', // Ensure the role is set correctly
      };
  
      // Insert the doctor into the database and return the result
      const [newDoctor] = await db.insert(doctor).values(doctorData).returning();
  
      return newDoctor;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error in addDoctor:', err.message);
        throw new Error('Failed to add doctor: ' + err.message);
      } else {
        console.error('Unknown error in addDoctor:', err);
        throw new Error('Failed to add doctor due to an unknown error');
      }
    }
  }
  

  async updateDoctor(id: number, data: Partial<{
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    country: string;
    username: string;
    password: string;
    postalCode: string;
    profilePhoto?: string;
  }>) {
    return await db
      .update(doctor)
      .set(data)
      .where(eq(doctor.id, id.toString()))
      .returning();
  }

}

// SecretaryService.ts

export class SecretaryService {
  async getAllSecretaries() {
    return await db.select().from(secretary);
  }

  async getSecretaryById(id: number) {
    return await db.select().from(secretary).where(eq(secretary.id, id.toString()));
  }

  async addSecretary(data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    country: string;
    username: string;
    password: string;
    role?: string;
    postalCode: string;
    profilePhoto?: string;
    hireDate: string;
    employmentStatus: string;
  }): Promise<any> {
    try {
      // Hash the password before inserting
  
      const secretaryData = {
        ...data,
        role: 'secretary', // Set role explicitly to 'secretary'
      };
  
      // Insert the secretary into the database and return the result
      const [newSecretary] = await db.insert(secretary).values(secretaryData).returning();
  
      return newSecretary;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error in addSecretary:', err.message);
        throw new Error('Failed to add secretary: ' + err.message);
      } else {
        console.error('Unknown error in addSecretary:', err);
        throw new Error('Failed to add secretary due to an unknown error');
      }
    }
  }
  
  

  async updateSecretary(id: number, data: Partial<{
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    country: string;
    username: string;
    password: string;
    postalCode: string;
    profilePhoto?: string;
    hireDate: string;
    employmentStatus: string;
  }>) {
    return await db
      .update(secretary)
      .set(data)
      .where(eq(secretary.id, id.toString()))
      .returning();
  }


}



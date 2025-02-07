import { db } from '../db/connexion';
import { eq } from 'drizzle-orm';
import { patient } from '../schema/PatientSchema';

export class PatientService {
  async getAllPatient() {
    return await db.select().from(patient);
  }

  async getPatientById(id: string) {
    return await db.select().from(patient).where(eq(patient.idPatient, id)).limit(1);
  }

  async addPatient(data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    maritalStatus: string;
    occupation: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    country: string;
    postalCode: string;
    allergy: string;
    bloodType: string;
  }) {
    try {
      const birthDate = new Date(data.birthDate);
      if (isNaN(birthDate.getTime())) {
        throw new Error('Invalid birthdate');
      }

      const [newPatient] = await db
        .insert(patient)
        .values({
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          occupation: data.occupation,
          email: data.email,
          phone: data.phone,
          adress: data.adress,
          city: data.city,
          country: data.country,
          postalCode: data.postalCode,
          allergy: data.allergy,
          bloodType: data.bloodType,
        })
        .returning();

      return newPatient;
    } catch (error) {
      console.error('Error adding patient:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }

  async updatePatient(
    id: string,
    data: Partial<{
      firstName: string;
      lastName: string;
      birthDate: string;
      gender: string;
      maritalStatus: string;
      occupation: string;
      email: string;
      phone: string;
      adress: string;
      city: string;
      country: string;
      postalCode: string;
      allergy: string;
      bloodType: string;
    }>
  ) {
    try {
      const [updatedPatient] = await db
        .update(patient)
        .set(data)
        .where(eq(patient.idPatient, id))
        .returning();

      return updatedPatient;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
  async deletePatient(id: string) {
    try {
      const [deletedPatient] = await db
        .delete(patient)
        .where(eq(patient.idPatient, id))
        .returning();

      return deletedPatient;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
}

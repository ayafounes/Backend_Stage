import { db } from '../db/connexion';
import { eq } from 'drizzle-orm';
import { prescription } from '../schema/PrescriptionSchema';

export class PrescreptionService {
  async getAllPrescreption() {
    return await db.select().from(prescription);
  }

  async getPrescreptionById(id: string) {
    return await db.select().from(prescription).where(eq(prescription.idPrescription, id)).limit(1);
  }

  async addPrescreption(data: {
    idPatient: string;
    idConsultation: string;
    datePrescription: string;
    nameMedication: string;
    typeMedication: string;
    signature: number;
  }) {
    try {
      // Ensure datePrescription is stored as a string in the correct format
      const datePrescription = new Date(data.datePrescription).toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
      const [newPrescription] = await db
        .insert(prescription)
        .values({
          idPatient: data.idPatient,
          idConsultation: data.idConsultation,
          datePrescription, // Use the formatted string
          nameMedication: data.nameMedication,
          typeMedication: data.typeMedication,
          signature: data.signature,
        })
        .returning();
  
      return newPrescription;
    } catch (error) {
      console.error('Error adding prescription:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
  

  async updatePrescreption(
    id: string,
    data: Partial<{
      datePrescription: string;
      nameMedication: string;
      typeMedication: string;
      signature: number;
    }>
  ) {
    try {
      const [updatedPrescription] = await db
        .update(prescription)
        .set(data)
        .where(eq(prescription.idPrescription, id))
        .returning();

      return updatedPrescription;
    } catch (error) {
      console.error('Error updating prescription:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
  async deletePrescreption(id: string) {
    try {
      const [deletedPrescription] = await db
        .delete(prescription)
        .where(eq(prescription.idPrescription, id))
        .returning();

      return deletedPrescription;
    } catch (error) {
      console.error('Error deleting prescription:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
}

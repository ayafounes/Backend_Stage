import { db } from '../db/connexion';
import { eq } from 'drizzle-orm';
import { consultation } from '../schema/ConsultationSchema';

export class ConsultationService {
  async getAllConsultation() {
    return await db.select().from(consultation);
  }

  async getConsultationById(id: string) {
    return await db.select().from(consultation).where(eq(consultation.idConsultation, id)).limit(1);
  }

  async addConsultation(data: {
    idPatient: string;
    idAppointement: string;
    dateConsultation: string; // Accept as ISO string
    diagnostic: string;
    treatment: string;
    symptoms: string;
    cost: number; // Accept as a number in the input
  }) {
    try {
      // Convert cost to a string and format the date if necessary
      const formattedCost = data.cost.toString();
      const formattedDateConsultation = new Date(data.dateConsultation).toISOString().split('T')[0];
  
      const [newConsultation] = await db
        .insert(consultation)
        .values({
          idPatient: data.idPatient,
          idAppointement: data.idAppointement,
          dateConsultation: formattedDateConsultation,
          diagnostic: data.diagnostic,
          treatment: data.treatment,
          symptoms: data.symptoms,
          cost: formattedCost, // Convert to string
        })
        .returning();
  
      return newConsultation;
    } catch (error) {
      console.error('Error adding consultation:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
  

  async updateConsultation(
    id: string,
    data: Partial<{
      dateConsultation: string;
      diagnostic: string;
      treatment: string;
      symptoms: string;
      cost: number;
    }>
  ) {
    try {
      const formattedData = {
        ...data,
        dateConsultation: data.dateConsultation
          ? new Date(data.dateConsultation).toISOString().split('T')[0]
          : undefined,
        cost: data.cost !== undefined ? data.cost.toString() : undefined, // Convert cost to string
      };
  
      const [updatedConsultation] = await db
        .update(consultation)
        .set(formattedData)
        .where(eq(consultation.idConsultation, id))
        .returning();
  
      return updatedConsultation;
    } catch (error) {
      console.error('Error updating consultation:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
  async deleteConsultation(id: string) {
    try {
      const [deletedConsultation] = await db
        .delete(consultation)
        .where(eq(consultation.idConsultation, id))
        .returning();
      
      return deletedConsultation;
    } catch (error) {
      console.error('Error deleting consultation:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
  
}

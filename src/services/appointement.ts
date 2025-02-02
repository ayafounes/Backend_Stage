import { db } from '../db/connexion';
import { eq } from 'drizzle-orm';
import { appointement } from '../schema/AppointementSchema';

export class AppointementService {
  async getAllAppointement() {
    return await db.select().from(appointement);
  }

  async getAppointementById(id: string) {
    return await db.select().from(appointement).where(eq(appointement.idAppointement, id)).limit(1);
  }

  async addAppointement(data: {
    idPatient: string;
    dateAppointement: string; // Ensure ISO format: YYYY-MM-DD
    description: string;
    startTime: string; // Ensure format: HH:MM:SS
    endTime: string; // Ensure format: HH:MM:SS
    typeAppointement: string;
  }) {
    try {
      // Format fields if necessary
      const formattedDateAppointement = new Date(data.dateAppointement).toISOString().split('T')[0];

      const [newAppointement] = await db
        .insert(appointement)
        .values({
          idPatient: data.idPatient,
          dateAppointement: formattedDateAppointement,
          description: data.description,
          startTime: data.startTime,
          endTime: data.endTime,
          typeAppointement: data.typeAppointement,
        })
        .returning();

      return newAppointement;
    } catch (error) {
      console.error('Error adding appointement:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }

  async updateAppointement(
    id: string,
    data: Partial<{
      dateAppointement: string;
      description: string;
      startTime: string;
      endTime: string;
      typeAppointement: string;
    }>
  ) {
    try {
      const formattedData = {
        ...data,
        dateAppointement: data.dateAppointement
          ? new Date(data.dateAppointement).toISOString().split('T')[0]
          : undefined,
      };

      const [updatedAppointement] = await db
        .update(appointement)
        .set(formattedData)
        .where(eq(appointement.idAppointement, id))
        .returning();

      return updatedAppointement;
    } catch (error) {
      console.error('Error updating appointement:', error);
      throw new Error(error instanceof Error ? error.message : 'Database error');
    }
  }
}

import { Context } from 'hono';
import { ConsultationService } from '../services/consultation';

const consultationService = new ConsultationService();

export class ConsultationController {
  async getAllConsultation(c: Context) {
    try {
      const consultations = await consultationService.getAllConsultation();
      return c.json(consultations, 200);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      return c.json({ message: 'Error fetching consultations', error }, 500);
    }
  }

  async getConsultationById(c: Context) {
    try {
      const id = c.req.param('id');
      const consultation = await consultationService.getConsultationById(id);
      if (!consultation) {
        return c.json({ message: 'Consultation not found' }, 404);
      }
      return c.json(consultation, 200);
    } catch (error) {
      console.error('Error fetching consultation:', error);
      return c.json({ message: 'Error fetching consultation', error }, 500);
    }
  }

  async addConsultation(c: Context) {
    try {
      const {
        idPatient,
        idAppointement,
        dateConsultation,
        diagnostic,
        treatment,
        statusPaiement,
        symptoms,
        cost,
      } = await c.req.json();

      // Validate required fields
      if (
        !idPatient ||
        !idAppointement ||
        !dateConsultation ||
        !diagnostic ||
        !treatment ||
        !symptoms ||
        typeof cost !== 'number'
      ) {
        return c.json({ message: 'Validation error: Missing or invalid required fields' }, 400);
      }

      // Call the addConsultation service method
      const newConsultation = await consultationService.addConsultation({
        idPatient,
        idAppointement,
        dateConsultation,
        diagnostic,
        treatment,
        symptoms,
        cost,
      });

      return c.json({ message: 'Consultation added successfully', consultation: newConsultation }, 201);
    } catch (error) {
      console.error('Error adding consultation:', error);
      return c.json(
        { message: 'Error adding consultation', error: error instanceof Error ? error.message : error },
        500
      );
    }
  }

  async updateConsultation(c: Context) {
    try {
      const id = c.req.param('id');
      const data = await c.req.json();

      const updatedConsultation = await consultationService.updateConsultation(id, data);
      if (!updatedConsultation) {
        return c.json({ message: 'Consultation not found' }, 404);
      }

      return c.json({ message: 'Consultation updated successfully', consultation: updatedConsultation }, 200);
    } catch (error) {
      console.error('Error updating consultation:', error);
      return c.json(
        { message: 'Error updating consultation', error: error instanceof Error ? error.message : error },
        500
      );
    }
  }
  async deleteConsultation(c: Context) {
    try {
      const id = c.req.param('id');
      const deletedConsultation = await consultationService.deleteConsultation(id);
      if (!deletedConsultation) {
        return c.json({ message: 'Consultation not found' }, 404);
      }
      return c.json(
        { message: 'Consultation deleted successfully', consultation: deletedConsultation },
        200
      );
    } catch (error) {
      console.error('Error deleting consultation:', error);
      return c.json(
        { message: 'Error deleting consultation', error: error instanceof Error ? error.message : error },
        500
      );
    }
  }
}

import { Context } from 'hono';
import { PrescreptionService } from '../services/prescreption';

const prescreptionService = new PrescreptionService();

export class PrescreptionController {
  async getAllPrescreption(c: Context) {
    try {
      const prescriptions = await prescreptionService.getAllPrescreption();
      return c.json(prescriptions, 200);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      return c.json({ message: 'Error fetching prescriptions', error }, 500);
    }
  }

  async getPrescreptionById(c: Context) {
    try {
      const id = c.req.param('id');
      const prescription = await prescreptionService.getPrescreptionById(id);
      if (!prescription) {
        return c.json({ message: 'Prescription not found' }, 404);
      }
      return c.json(prescription, 200);
    } catch (error) {
      console.error('Error fetching prescription:', error);
      return c.json({ message: 'Error fetching prescription', error }, 500);
    }
  }

  async addPrescreption(c: Context) {
    try {
      const {
        idPatient,
        idConsultation,
        datePrescription,
        nameMedication,
        typeMedication,
        signature,
      } = await c.req.json();

      // Validate required fields
      if (
        !idPatient ||
        !idConsultation ||
        !datePrescription ||
        !nameMedication ||
        !typeMedication ||
        !signature
      ) {
        return c.json({ message: 'Validation error: Missing required fields' }, 400);
      }

      // Call the addPrescreption service method
      const newPrescription = await prescreptionService.addPrescreption({
        idPatient,
        idConsultation,
        datePrescription,
        nameMedication,
        typeMedication,
        signature,
      });

      return c.json({ message: 'Prescription added successfully', prescription: newPrescription }, 201);
    } catch (error) {
      console.error('Error adding prescription:', error);
      return c.json(
        { message: 'Error adding prescription', error: error instanceof Error ? error.message : error },
        500
      );
    }
  }

  async updatePrescreption(c: Context) {
    try {
      const id = c.req.param('id');
      const data = await c.req.json();

      const updatedPrescription = await prescreptionService.updatePrescreption(id, data);
      if (!updatedPrescription) {
        return c.json({ message: 'Prescription not found' }, 404);
      }

      return c.json({ message: 'Prescription updated successfully', prescription: updatedPrescription }, 200);
    } catch (error) {
      console.error('Error updating prescription:', error);
      return c.json(
        { message: 'Error updating prescription', error: error instanceof Error ? error.message : error },
        500
      );
    }
  }
  async deletePrescreption(c: Context) {
    try {
      const id = c.req.param('id');
      const deletedPrescription = await prescreptionService.deletePrescreption(id);
      if (!deletedPrescription) {
        return c.json({ message: 'Prescription not found' }, 404);
      }
      return c.json({ message: 'Prescription deleted successfully', prescription: deletedPrescription }, 200);
    } catch (error) {
      console.error('Error deleting prescription:', error);
      return c.json(
        { message: 'Error deleting prescription', error: error instanceof Error ? error.message : error },
        500
      );
    }
  }
}

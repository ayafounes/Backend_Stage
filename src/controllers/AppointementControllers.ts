import { Context } from 'hono';
import { AppointementService } from '../services/appointement';

const appointementService = new AppointementService();

export class AppointementController {
  async getAllAppointement(c: Context) {
    try {
      const appointements = await appointementService.getAllAppointement();
      return c.json(appointements, 200);
    } catch (error) {
      console.error('Error fetching appointements:', error);
      return c.json({ message: 'Error fetching appointements', error }, 500);
    }
  }

  async getAppointementById(c: Context) {
    try {
      const id = c.req.param('id');
      const appointement = await appointementService.getAppointementById(id);
      if (!appointement) {
        return c.json({ message: 'Appointement not found' }, 404);
      }
      return c.json(appointement, 200);
    } catch (error) {
      console.error('Error fetching appointement:', error);
      return c.json({ message: 'Error fetching appointement', error }, 500);
    }
  }

  async addAppointement(c: Context) {
    try {
      const {
        idPatient,
        dateAppointement,
        description,
        startTime,
        endTime,
        typeAppointement,
      } = await c.req.json();

      // Validate required fields
      if (
        !idPatient ||
        !dateAppointement ||
        !description ||
        !startTime ||
        !endTime ||
        !typeAppointement
      ) {
        return c.json({ message: 'Validation error: Missing required fields' }, 400);
      }

      // Call the addAppointement service method
      const newAppointement = await appointementService.addAppointement({
        idPatient,
        dateAppointement,
        description,
        startTime,
        endTime,
        typeAppointement,
      });

      return c.json({ message: 'Appointement added successfully', appointement: newAppointement }, 201);
    } catch (error) {
      console.error('Error adding appointement:', error);
      return c.json({ message: 'Error adding appointement', error }, 500);
    }
  }

  async updateAppointement(c: Context) {
    try {
      const id = c.req.param('id');
      const data = await c.req.json();

      const updatedAppointement = await appointementService.updateAppointement(id, data);
      if (!updatedAppointement) {
        return c.json({ message: 'Appointement not found' }, 404);
      }

      return c.json({ message: 'Appointement updated successfully', appointement: updatedAppointement }, 200);
    } catch (error) {
      console.error('Error updating appointement:', error);
      return c.json({ message: 'Error updating appointement', error }, 500);
    }
  }
  async deleteAppointement(c: Context) {
    try {
      const id = c.req.param('id'); // Récupère l'ID depuis l'URL
      const deletedAppointement = await appointementService.deleteAppointement(id);

      if (!deletedAppointement) {
        return c.json({ message: 'Appointement not found' }, 404);
      }

      return c.json({ message: 'Appointement deleted successfully', appointement: deletedAppointement }, 200);
    } catch (error) {
      console.error('Error deleting appointement:', error);
      return c.json({ message: 'Error deleting appointement', error }, 500);
    }
  }
}

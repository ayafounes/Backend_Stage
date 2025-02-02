import { PatientService } from '../services/patient';
import { Context } from 'hono';

const patientService = new PatientService();

export class PatientController {
  async getAllPatient(c: Context) {
    try {
      const patients = await patientService.getAllPatient();
      return c.json(patients, 200);
    } catch (error) {
      console.error('Error fetching patients:', error);
      return c.json({ message: 'Error fetching patients', error }, 500);
    }
  }

  async getPatientById(c: Context) {
    try {
      const  id = c.req.param('id');
      const patient = await patientService.getPatientById(id);
      if (!patient) {
        return c.json({ message: 'Patient not found' }, 404);
      }
      return c.json(patient, 200);
    } catch (error) {
      console.error('Error fetching patient:', error);
      return c.json({ message: 'Error fetching patient', error }, 500);
    }
  }

  async addPatient(c: Context) {
    try {
      const {
        firstName,
        lastName,
        birthDate,
        gender,
        maritalStatus,
        occupation,
        email,
        phone,
        adress,
        city,
        country,
        postalCode,
        allergy,
        bloodType,
      } = await c.req.json();

      // Validate required fields
      if (
        !firstName ||
        !lastName ||
        !birthDate ||
        !gender ||
        !maritalStatus ||
        !occupation ||
        !email ||
        !phone ||
        !adress ||
        !city ||
        !country ||
        !postalCode ||
        !allergy ||
        !bloodType
      ) {
        return c.json({ message: 'Validation error: Missing required fields' }, 400);
      }

      // Call the addPatient service method
      const newPatient = await patientService.addPatient({
        firstName,
        lastName,
        birthDate,
        gender,
        maritalStatus,
        occupation,
        email,
        phone,
        adress,
        city,
        country,
        postalCode,
        allergy,
        bloodType,
      });

      return c.json({ message: 'Patient added successfully', patient: newPatient }, 201);
    } catch (error) {
      console.error('Error adding patient:', error);
      return c.json({ message: 'Error adding patient', error: error instanceof Error ? error.message : error }, 500);
    }
  }

  async updatePatient(c: Context) {
    try {
      const id = c.req.param('id');
      const data = await c.req.json();

      const updatedPatient = await patientService.updatePatient(id, data);

      if (!updatedPatient) {
        return c.json({ message: 'Patient not found' }, 404);
      }

      return c.json({ message: 'Patient updated successfully', patient: updatedPatient }, 200);
    } catch (error) {
      console.error('Error updating patient:', error);
      return c.json({ message: 'Error updating patient', error: error instanceof Error ? error.message : error }, 500);
    }
  }
}

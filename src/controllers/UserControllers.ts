
import { DoctorService, SecretaryService} from '../services/user';

import { Context } from 'hono';

const doctorService = new DoctorService();
const secretaryService = new SecretaryService();

export class UserController {
  // Doctor Controllers
  async getAllDoctors(c: Context) {
    try {
      const doctors = await doctorService.getAllDoctors();
      return c.json(doctors, 200);
    } catch (error) {
      return c.json({ message: 'Error fetching doctors', error }, 500);
    }
  }

  async getDoctorById(c: Context) {
    try {
      const id = Number(c.req.param('id'));
      const doctor = await doctorService.getDoctorById(id);
      if (!doctor) {
        return c.json({ message: 'Doctor not found' }, 404);
      }
      return c.json(doctor, 200);
    } catch (error) {
      return c.json({ message: 'Error fetching doctor', error }, 500);
    }
  }

  async addDoctorController(c: Context) {
    try {
      const {
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        phone,
        adress,
        city,
        country,
        username,
        password,
        postalCode,
        profilePhoto,
      } = await c.req.json();
  
      // Ensure required fields are validated
      if (
        !firstName ||
        !lastName ||
        !birthDate ||
        !gender ||
        !email ||
        !phone ||
        !adress ||
        !city ||
        !country ||
        !username ||
        !password ||
        !postalCode
      ) {
        return c.json({ message: 'Validation error: Missing required fields' }, 400);
      }
  
      // Call the addDoctor service method
      await doctorService.addDoctor({
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        phone,
        adress,
        city,
        country,
        username,
        password,
        postalCode,
        profilePhoto,
      });
  
      return c.json({ message: 'Doctor added successfully' }, 201);
    } catch (error) {
      console.error('Error adding doctor:', error);
      return c.json(
        {
          message: 'Error adding doctor',
          error: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  
  
  
  
  

  async updateDoctor(c: Context) {
    try {
      const id = Number(c.req.param('id'));
      const data = await c.req.json();
      const updatedDoctor = await doctorService.updateDoctor(id, data);
      if (!updatedDoctor) {
        return c.json({ message: 'Doctor not found' }, 404);
      }
      return c.json(updatedDoctor, 200);
    } catch (error) {
      return c.json({ message: 'Error updating doctor', error }, 500);
    }
  }


  // Secretary Controllers
  async getAllSecretaries(c: Context) {
    try {
      const secretaries = await secretaryService.getAllSecretaries();
      return c.json(secretaries, 200);
    } catch (error) {
      return c.json({ message: 'Error fetching secretaries', error }, 500);
    }
  }

  async getSecretaryById(c: Context) {
    try {
      const id = Number(c.req.param('id'));
      const secretary = await secretaryService.getSecretaryById(id);
      if (!secretary) {
        return c.json({ message: 'Secretary not found' }, 404);
      }
      return c.json(secretary, 200);
    } catch (error) {
      return c.json({ message: 'Error fetching secretary', error }, 500);
    }
  }

  async addSecretaryController(c: Context) {
    try {
      const {
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        phone,
        adress,
        city,
        country,
        username,
        password,
        postalCode,
        profilePhoto,
        hireDate,
        employmentStatus,
      } = await c.req.json();
  
      // Ensure required fields are validated
      if (
        !firstName ||
        !lastName ||
        !birthDate ||
        !gender ||
        !email ||
        !phone ||
        !adress ||
        !city ||
        !country ||
        !username ||
        !password ||
        !postalCode ||
        !hireDate ||
        !employmentStatus
      ) {
        return c.json(
          { message: 'Validation error: Missing required fields' },
          400
        );
      }
  
      // Call the addSecretary service method
      await secretaryService.addSecretary({
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        phone,
        adress,
        city,
        country,
        username,
        password,
        postalCode,
        profilePhoto,
        hireDate,
        employmentStatus,
      });
  
      return c.json({ message: 'Secretary added successfully' }, 201);
    } catch (error) {
      console.error('Error adding secretary:', error);
      return c.json(
        {
          message: 'Error adding secretary',
          error: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  
  

  async updateSecretary(c: Context) {
    try {
      const id = Number(c.req.param('id'));
      const data = await c.req.json();
      const updatedSecretary = await secretaryService.updateSecretary(id, data);
      if (!updatedSecretary) {
        return c.json({ message: 'Secretary not found' }, 404);
      }
      return c.json(updatedSecretary, 200);
    } catch (error) {
      return c.json({ message: 'Error updating secretary', error }, 500);
    }
  }

  
}
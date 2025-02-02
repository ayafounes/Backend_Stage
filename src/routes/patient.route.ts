
import { Hono } from 'hono';
import { PatientController } from '../controllers/PatientControllers';


const router = new Hono();
const patientController = new PatientController();

// Define routes and map them to controller methods
router.get('/:id', (c) => patientController.getPatientById(c));
router.post('/', (c) => patientController.addPatient(c));
router.put('/:id', (c) =>patientController.updatePatient(c));
router.get('/', (c) => patientController.getAllPatient(c));
export default router;


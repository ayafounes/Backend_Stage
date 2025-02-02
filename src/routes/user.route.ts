
import { Hono } from 'hono';
import { UserController } from '../controllers/UserControllers';

const router = new Hono();
const userController = new UserController();
// Define routes and map them to controller methods
router.get('/doctor', (c) => userController.getAllDoctors(c));
router.get('/secretary', (c) => userController.getAllSecretaries(c));
router.get('/:id', (c) => userController.getSecretaryById(c));
router.post('/secretary', (c) => userController.addSecretaryController(c));
router.put('/:id', (c) => userController.updateSecretary(c));

router.get('/:id', (c) => userController.getDoctorById(c));
router.post('/doctor', (c) => userController.addDoctorController(c));
router.put('/:id', (c) => userController.updateDoctor(c));

export default router;


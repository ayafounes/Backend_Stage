import { PrescreptionController } from '../controllers/PrescreptionControllers';


import { Hono } from 'hono';


const router = new Hono();
const prescreptionController = new PrescreptionController();

// Define routes and map them to controller methods
router.get('/:id', (c) => prescreptionController.getPrescreptionById(c));
router.post('/', (c) => prescreptionController.addPrescreption(c));
router.put('/:id', (c) => prescreptionController.updatePrescreption(c));
router.get('/', (c) => prescreptionController.getAllPrescreption(c));
router.delete('/:id', (c) => prescreptionController.deletePrescreption(c));
export default router;


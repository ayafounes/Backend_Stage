import { Hono } from 'hono';
import { serve } from '@hono/node-server'; // For serving Hono app
import { checkDbConnection } from './db/connexion';  // Adjust path if needed
import userRoutes from './routes/user.route';  // Adjust path if needed
import appointementRoutes from './routes/appointement.route';  // Adjust path if needed
import consultationRoutes from './routes/consultation.route';  // Adjust path if needed
import prescreptionRoutes from './routes/prescreption.route';  // Adjust path if needed
import patientRoutes from './routes/patient.route';  // Adjust path if needed
import { cors } from 'hono/cors'; // Use Hono's built-in CORS

// Initialize Hono app
const app = new Hono();
app.use(cors()); // Allow requests from all origins

// Middleware to log API requests
app.use('*', async (c, next) => {
  const { method, url } = c.req;
  console.log(`[API Request] ${method} ${url}`);
  await next();
});
app.route('/api/user', userRoutes);
app.route('/api/appointement', appointementRoutes);
app.route('/api/consultation', consultationRoutes);
app.route('/api/prescreption', prescreptionRoutes);
app.route('/api/patient', patientRoutes);

// Log and check database connection when the app starts
const PORT = 4000; // Change this to your desired port
serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
);
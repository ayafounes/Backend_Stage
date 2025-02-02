import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // Spécifie PostgreSQL comme le dialecte de la base de données
  schema: [
    "./src/schema/AppointementSchema.ts",  // Chemin vers ton schéma Appointment
    "./src/schema/PatientSchema.ts",      // Chemin vers ton schéma Patient
    "./src/schema/ConsultationSchema.ts", // Chemin vers ton schéma Consultation
    "./src/schema/PrescreptionSchema.ts", // Chemin vers ton schéma Prescription
    "./src/schema/UserSchema.ts"          // Chemin vers ton schéma User
  ], // Chemins vers les fichiers des schémas en TypeScript
  out: "./drizzle/migrations", // Dossier pour les fichiers de migration
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "aya",  // Ton nom d'utilisateur PostgreSQL
    password: "aya123", // Ton mot de passe PostgreSQL
    database: "test",   // Le nom de ta base de données PostgreSQL
    ssl: false,         // Désactive SSL si non nécessaire
  },
  migrations: {
    table: "my_migrations_table", // Nom de la table des migrations (optionnel)
    schema: "public",             // Schéma à utiliser (uniquement pour PostgreSQL)
  },
});


import { pgTable, uuid, text, date, numeric } from 'drizzle-orm/pg-core';
import { appointement } from './AppointementSchema';
import { patient } from './PatientSchema';
import { relations } from 'drizzle-orm';

export const consultation = pgTable('consultation', {
  idConsultation: uuid('idConsultation').primaryKey().defaultRandom(), // Primary key
  idPatient: uuid('idPatient').notNull().references(() => patient.idPatient), // Add idPatient field
  idAppointement: uuid('idAppointement').notNull().references(() => appointement.idAppointement),
  dateConsultation: date('dateConsultation').notNull(),
  diagnostic: text('diagnostic').notNull(),
  treatment: text('treatment').notNull(),
  symptoms: text('symptoms').notNull(),
  cost: numeric('cost', { precision: 10, scale: 2 }).notNull(),
});


export const consultationRelations = relations(consultation, ({ many }) => ({
  patients: many(patient), // Correction de 'pateints' -> 'patients'
  appointements: many(appointement), // Correction de 'appointementes' -> 'appointement'
}));

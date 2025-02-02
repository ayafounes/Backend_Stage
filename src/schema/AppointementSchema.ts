import { pgTable, uuid, text, date, time } from 'drizzle-orm/pg-core';
import { patient } from './PatientSchema';
import { relations } from 'drizzle-orm';

export const appointement = pgTable('appointement', {
  idAppointement: uuid('idAppointement').primaryKey().defaultRandom(), // Auto-generate ID
  idPatient: uuid('idPatient').references(() => patient.idPatient), // Foreign key to Patient
  dateAppointement: date('dateAppointement').notNull(),
  description: text('description').notNull(),
  startTime: time('startTime').notNull(),
  endTime: time('endTime').notNull(),
  typeAppointement: text('typeAppointement').notNull(),
});

export const appointementRelations = relations(appointement, ({ many }) => ({
  patients: many(patient),
}));

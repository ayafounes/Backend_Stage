
import { pgTable, uuid, text, date, integer } from 'drizzle-orm/pg-core';
import { consultation } from './ConsultationSchema';
import { patient } from './PatientSchema';
import { relations } from 'drizzle-orm';

export const prescription = pgTable('prescription', {
  idPrescription: uuid('idPrescription').primaryKey().defaultRandom(), // Identifiant unique pour chaque prescription
  idPatient: uuid('idPatient').references(() => patient.idPatient), // Référence à 'idPatient'
  idConsultation: uuid('idConsultation').references(() => consultation.idConsultation), // Référence à 'idConsultation'
  datePrescription: date('datePrescription').notNull(), // Date de la prescription
  nameMedication: text('nameMedication').notNull(), // Nom du médicament
  typeMedication: text('typeMedication').notNull(), // Type du médicament
  signature: integer('signature').notNull(), // Signature
});

export const prescriptionRelations = relations(prescription, ({ many }) => ({
  patients: many(patient), // Correction de 'pateints' -> 'patients'
  consultations: many(consultation),
}));

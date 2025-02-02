import { pgTable, text, date, uuid } from 'drizzle-orm/pg-core';

export const patient = pgTable('patient', {
  idPatient: uuid('idPatient').primaryKey().defaultRandom(), // Identifiant unique pour chaque patient
  firstName: text('firstName').notNull(), // Prénom du patient
  lastName: text('lastName').notNull(), // Nom du patient
  birthDate: date('birthDate').notNull(), // Date de naissance
  gender: text('gender').notNull(), // Sexe du patient
  maritalStatus: text('maritalStatus').notNull(), // Statut marital
  occupation: text('occupation').notNull(), // Profession du patient
  email: text('email').notNull(), // Adresse email
  phone: text('phone').notNull(), // Numéro de téléphone
  adress: text('adress').notNull(), // Adresse du patient
  city: text('city').notNull(), // Ville
  country: text('country').notNull(), // Pays
  postalCode: text('postalCode').notNull(), // Code postal
  allergy: text('allergy').notNull(), // Allergies éventuelles
  bloodType: text('bloodType').notNull(), // Groupe sanguin
});

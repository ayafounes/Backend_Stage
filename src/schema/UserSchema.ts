import { password } from 'bun';
import { pgTable, text, date, uuid, integer } from 'drizzle-orm/pg-core';

// Base user schema
export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(), // Clé primaire avec valeur générée aléatoirement
  firstName: text('firstName').notNull(), // Prénom
  lastName: text('lastName').notNull(), // Nom
  birthDate: date('birthDate').notNull(), // Date de naissance
  gender: text('gender').notNull(), // Sexe
  email: text('email').notNull(), // Adresse email
  phone: text('phone').notNull(), // Numéro de téléphone
  adress: text('adress').notNull(), // Adresse
  city: text('city').notNull(), // Ville
  country: text('country').notNull(), // Pays
  username: text('username').notNull(), // Nom d'utilisateur
  password: text('password').notNull(), // Mot de passe
  role: text('role').notNull(), // Rôle
  postalCode: text('postalCode').notNull(), // Code postal
  profilePhoto: text('profilePhoto') // Photo de profil
});

// Doctor schema inheriting from user
export const doctor = pgTable('doctor', {
  id: uuid('id').primaryKey().defaultRandom(), // Id du médecin
  firstName: text('firstName').notNull(), // Prénom
  lastName: text('lastName').notNull(), // Nom
  birthDate: date('birthDate').notNull(), // Date de naissance
  gender: text('gender').notNull(), // Sexe
  email: text('email').notNull(), // Adresse email
  phone: text('phone').notNull(), // Numéro de téléphone
  adress: text('adress').notNull(), // Adresse
  city: text('city').notNull(), // Ville
  country: text('country').notNull(), // Pays
  username: text('username').notNull(), // Nom d'utilisateur
  password: text('password').notNull(), // Mot de passe
  role: text('role').notNull(), // Rôle
  postalCode: text('postalCode').notNull(), // Code postal
  profilePhoto: text('profilePhoto'), // Photo de profil
  // Champs spécifiques au médecin

});

// Secretary schema inheriting from user with additional fields
export const secretary = pgTable('secretary', {
  id: uuid('id').primaryKey().defaultRandom(), // Id de la secrétaire
  firstName: text('firstName').notNull(), // Prénom
  lastName: text('lastName').notNull(), // Nom
  birthDate: date('birthDate').notNull(), // Date de naissance
  gender: text('gender').notNull(), // Sexe
  email: text('email').notNull(), // Adresse email
  phone: text('phone').notNull(), // Numéro de téléphone
  adress: text('adress').notNull(), // Adresse
  city: text('city').notNull(), // Ville
  country: text('country').notNull(), // Pays
  username: text('username').notNull(), // Nom d'utilisateur
  password: text('password').notNull(), // Mot de passe
  role: text('role').notNull(), // Rôle
  postalCode: text('postalCode').notNull(), // Code postal
  profilePhoto: text('profilePhoto'), // Photo de profil
  // Champs spécifiques à la secrétaire
  hireDate: date('hireDate').notNull(), // Date d'embauche
  employmentStatus: text('employmentStatus').notNull(), // Statut d'emploi

});

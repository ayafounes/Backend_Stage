CREATE TABLE "appointement" (
    "idAppointement" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "idPatient" uuid,
    "dateAppointement" date NOT NULL,
    "description" text NOT NULL,
    "startTime" time NOT NULL,
    "endTime" time NOT NULL,
    "typeAppointement" text NOT NULL
);

CREATE TABLE "patient" (
    "idPatient" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "birthDate" date NOT NULL,
    "gender" text NOT NULL,
    "maritalStatus" text NOT NULL,
    "occupation" text NOT NULL,
    "email" text NOT NULL,
    "phone" text NOT NULL,
    "adress" text NOT NULL,
    "city" text NOT NULL,
    "country" text NOT NULL,
    "postalCode" text NOT NULL,
    "allergy" text NOT NULL,
    "bloodType" text NOT NULL
);

CREATE TABLE "consultation" (
    "idConsultation" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "idPatient" uuid,
    "idAppointement" uuid,
    "dateConsultation" date NOT NULL,
    "diagnostic" text NOT NULL,
    "treatment" text NOT NULL,
    "symptoms" text NOT NULL,
    "cost" numeric(10, 2) NOT NULL
);

CREATE TABLE "doctor" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "birthDate" date NOT NULL,
    "gender" text NOT NULL,
    "email" text NOT NULL,
    "phone" text NOT NULL,
    "adress" text NOT NULL,
    "city" text NOT NULL,
    "country" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    "postalCode" text NOT NULL,
    "profilePhoto" text
);

CREATE TABLE "secretary" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "birthDate" date NOT NULL,
    "gender" text NOT NULL,
    "email" text NOT NULL,
    "phone" text NOT NULL,
    "adress" text NOT NULL,
    "city" text NOT NULL,
    "country" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    "postalCode" text NOT NULL,
    "profilePhoto" text,
    "hireDate" date NOT NULL,
    "employmentStatus" text NOT NULL
);

CREATE TABLE "user" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "birthDate" date NOT NULL,
    "gender" text NOT NULL,
    "email" text NOT NULL,
    "phone" text NOT NULL,
    "adress" text NOT NULL,
    "city" text NOT NULL,
    "country" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    "postalCode" text NOT NULL,
    "profilePhoto" text
);

CREATE TABLE "prescription" (
    "idPrescription" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "idPatient" uuid NOT NULL,
    "idConsultation" uuid NOT NULL,
    "datePrescription" date NOT NULL,
    "nameMedication" text NOT NULL,
    "typeMedication" text NOT NULL,
    "signature" integer NOT NULL
);

-- Add foreign key constraints
ALTER TABLE "appointement"
    ADD CONSTRAINT "appointement_idPatient_patient_idPatient_fk" FOREIGN KEY ("idPatient") REFERENCES "public"."patient"("idPatient") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "consultation"
    ADD CONSTRAINT "consultation_idPatient_patient_idPatient_fk" FOREIGN KEY ("idPatient") REFERENCES "public"."patient"("idPatient") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "consultation"
    ADD CONSTRAINT "consultation_idAppointement_appointement_idAppointement_fk" FOREIGN KEY ("idAppointement") REFERENCES "public"."appointement"("idAppointement") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "prescription"
    ADD CONSTRAINT "prescription_idPatient_patient_idPatient_fk" FOREIGN KEY ("idPatient") REFERENCES "public"."patient"("idPatient") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "prescription"
    ADD CONSTRAINT "prescription_idConsultation_consultation_idConsultation_fk" FOREIGN KEY ("idConsultation") REFERENCES "public"."consultation"("idConsultation") ON DELETE NO ACTION ON UPDATE NO ACTION;

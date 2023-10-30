CREATE TYPE "role" AS ENUM (
  'admin',
  'manager',
  'customer'
);

CREATE TYPE "bookingStatus" AS ENUM (
  'pending',
  'ongoing',
  'completed'
);

CREATE TYPE "bookingType" AS ENUM (
  'retrieve',
  'return'
);

CREATE TYPE "articleType" AS ENUM (
  'rentalEquipment',
  'rentalAccessory',
  'salesItem'
);

CREATE TYPE "identificationStatus" AS ENUM (
  'pending',
  'failed',
  'completed'
);

CREATE TYPE "accountType" AS ENUM (
  'organization',
  'personal'
);

CREATE TYPE "paymentStatus" AS ENUM (
  'pending',
  'failed',
  'succeeded'
);

CREATE TABLE "profiles" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "role" role,
  "accountType" accountType,
  "customerNumber" text,
  "customerName" text,
  "firstName" text,
  "lastName" text,
  "approvedAt" timestamptz
);

CREATE TABLE "bleProtocols" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "name" text NOT NULL,
  "serviceUUID" text NOT NULL,
  "characteristicReadUUID" text NOT NULL,
  "characteristicWriteUUID" text NOT NULL
);

CREATE TABLE "bleLogs" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "boxId" uuid NOT NULL,
  "slotBookingId" uuid,
  "profileId" uuid NOT NULL,
  "command" text NOT NULL,
  "message" text NOT NULL,
  "response" text NOT NULL
);

CREATE TABLE "boxGroups" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "name" text NOT NULL,
  "siteId" uuid NOT NULL
);

CREATE TABLE "boxes" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "name" text NOT NULL,
  "macAddress" text NOT NULL,
  "length" int NOT NULL,
  "width" int NOT NULL,
  "height" int NOT NULL,
  "boxGroupId" uuid NOT NULL,
  "bleProtocolId" uuid NOT NULL
);

CREATE TABLE "slots" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "name" text NOT NULL,
  "slotNo" int NOT NULL,
  "x" int NOT NULL,
  "y" int NOT NULL,
  "length" int NOT NULL,
  "width" int NOT NULL,
  "height" int NOT NULL,
  "boxId" uuid NOT NULL
);

CREATE TABLE "sites" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "name" text NOT NULL,
  "address" text NOT NULL,
  "location" geometry NOT NULL,
  "hllStatusId" int,
  "disabled" boolean,
  "openingHours" text,
  "url" text NOT NULL,
  "directions" text NOT NULL
);

CREATE TABLE "articles" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "type" articleType NOT NULL DEFAULT 'rentalEquipment',
  "name" text NOT NULL,
  "categoryName" text,
  "sra" text,
  "brand" text,
  "model" text,
  "slug" text,
  "length" int,
  "width" int,
  "height" int,
  "hllManufacturerModelId" text,
  "hllFleetModelId" text,
  "preferredCount" int NOT NULL,
  "price" int NOT NULL
);

CREATE TABLE "packages" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "name" text NOT NULL
);

CREATE TABLE "articlesPackages" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "articleId" uuid NOT NULL,
  "packageId" uuid NOT NULL
);

CREATE TABLE "bookings" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "status" bookingStatus NOT NULL,
  "hllOrderNumber" text
);

CREATE TABLE "slotBookings" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "status" bookingStatus NOT NULL,
  "type" bookingType NOT NULL,
  "slotId" uuid NOT NULL,
  "bookingId" uuid
);

CREATE TABLE "slotBookingsReferences" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "name" text NOT NULL,
  "references" text[],
  "slotBookingId" uuid NOT NULL,
  "articleId" uuid
);

CREATE TABLE "bookingAccesses" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "bookingId" uuid NOT NULL,
  "profileId" uuid NOT NULL
);

CREATE TABLE "identifications" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "status" identificationStatus NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "updatedAt" timestamptz NOT NULL DEFAULT (now()),
  "personalNumber" text
);

CREATE TABLE "articleImages" (
  "name" text PRIMARY KEY NOT NULL,
  "articleId" uuid NOT NULL
);

CREATE TABLE "hllArticles" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "fleetModelId" text,
  "manufacturerModelId" text,
  "articleId" uuid
);

CREATE TABLE "creditReports" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "raw" text NOT NULL,
  "profileId" uuid NOT NULL
);

CREATE TABLE "payments" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "status" paymentStatus NOT NULL,
  "bookingId" uuid UNIQUE NOT NULL
);

ALTER TABLE "bleLogs" ADD FOREIGN KEY ("boxId") REFERENCES "boxes" ("id");

ALTER TABLE "bleLogs" ADD FOREIGN KEY ("slotBookingId") REFERENCES "slotBookings" ("id");

ALTER TABLE "bleLogs" ADD FOREIGN KEY ("profileId") REFERENCES "profiles" ("id");

ALTER TABLE "boxGroups" ADD FOREIGN KEY ("siteId") REFERENCES "sites" ("id");

ALTER TABLE "boxes" ADD FOREIGN KEY ("boxGroupId") REFERENCES "boxGroups" ("id");

ALTER TABLE "boxes" ADD FOREIGN KEY ("bleProtocolId") REFERENCES "bleProtocols" ("id");

ALTER TABLE "slots" ADD FOREIGN KEY ("boxId") REFERENCES "boxes" ("id");

ALTER TABLE "articlesPackages" ADD FOREIGN KEY ("articleId") REFERENCES "articles" ("id");

ALTER TABLE "articlesPackages" ADD FOREIGN KEY ("packageId") REFERENCES "packages" ("id");

ALTER TABLE "slotBookings" ADD FOREIGN KEY ("slotId") REFERENCES "slots" ("id");

ALTER TABLE "slotBookings" ADD FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id");

ALTER TABLE "slotBookingsReferences" ADD FOREIGN KEY ("slotBookingId") REFERENCES "slotBookings" ("id");

ALTER TABLE "slotBookingsReferences" ADD FOREIGN KEY ("articleId") REFERENCES "articles" ("id");

ALTER TABLE "bookingAccesses" ADD FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id");

ALTER TABLE "bookingAccesses" ADD FOREIGN KEY ("profileId") REFERENCES "profiles" ("id");

ALTER TABLE "articleImages" ADD FOREIGN KEY ("articleId") REFERENCES "articles" ("id");

ALTER TABLE "hllArticles" ADD FOREIGN KEY ("articleId") REFERENCES "articles" ("id");

ALTER TABLE "creditReports" ADD FOREIGN KEY ("profileId") REFERENCES "profiles" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id");

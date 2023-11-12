import { z } from "zod";

const role = z.enum(["admin", "manager", "customer"]);

const bookingStatus = z.enum(["pending", "ongoing", "completed"]);

const bookingType = z.enum(["retrieve", "return"]);

const articleType = z.enum(["rentalEquipment", "rentalAccessory", "salesItem"]);

const identificationStatus = z.enum(["pending", "failed", "completed"]);

const accountType = z.enum(["organization", "personal"]);

const paymentStatus = z.enum(["pending", "failed", "succeeded"]);

const siteStatus = z.enum(["active", "comingSoon", "disabled"]);

const profileSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  role: role.optional(),
  accountType: accountType.optional(),
  customerNumber: z.string().optional(),
  customerName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  approvedAt: z.string().optional(),
});
export const profiles = {
  schema: profileSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    bleLogs: {
      relation: "*",
      schema: "bleLogs",
      key: "bleLogs_profileId_fkey",
    },
    bookingAccesses: {
      relation: "*",
      schema: "bookingAccesses",
      key: "bookingAccesses_profileId_fkey",
    },
    creditReports: {
      relation: "*",
      schema: "creditReports",
      key: "creditReports_profileId_fkey",
    },
  },
} as const;

const bleProtocolSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  serviceUUID: z.string(),
  characteristicReadUUID: z.string(),
  characteristicWriteUUID: z.string(),
});
export const bleProtocols = {
  schema: bleProtocolSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    boxes: { relation: "*", schema: "boxes", key: "boxes_bleProtocolId_fkey" },
  },
} as const;

const bleLogSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  boxId: z.string().uuid(),
  slotBookingId: z.string().uuid().optional(),
  profileId: z.string().uuid(),
  command: z.string(),
  message: z.string(),
  response: z.string(),
});
export const bleLogs = {
  schema: bleLogSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    box: { relation: "1", schema: "boxes", key: "bleLogs_boxId_fkey" },
    slotBooking: {
      relation: "1",
      schema: "slotBookings",
      key: "bleLogs_slotBookingId_fkey",
    },
    profile: {
      relation: "1",
      schema: "profiles",
      key: "bleLogs_profileId_fkey",
    },
  },
} as const;

const boxGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  siteId: z.string().uuid(),
});
export const boxGroups = {
  schema: boxGroupSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    site: { relation: "1", schema: "sites", key: "boxGroups_siteId_fkey" },
    boxes: { relation: "*", schema: "boxes", key: "boxes_boxGroupId_fkey" },
  },
} as const;

const boxSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  macAddress: z.string(),
  length: z.number().int(),
  width: z.number().int(),
  height: z.number().int(),
  boxGroupId: z.string().uuid(),
  bleProtocolId: z.string().uuid(),
});
export const boxes = {
  schema: boxSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    bleLogs: { relation: "*", schema: "bleLogs", key: "bleLogs_boxId_fkey" },
    boxGroup: {
      relation: "1",
      schema: "boxGroups",
      key: "boxes_boxGroupId_fkey",
    },
    bleProtocol: {
      relation: "1",
      schema: "bleProtocols",
      key: "boxes_bleProtocolId_fkey",
    },
    slots: { relation: "*", schema: "slots", key: "slots_boxId_fkey" },
  },
} as const;

const slotSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slotNo: z.number().int(),
  x: z.number().int(),
  y: z.number().int(),
  length: z.number().int(),
  width: z.number().int(),
  height: z.number().int(),
  boxId: z.string().uuid(),
});
export const slots = {
  schema: slotSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    box: { relation: "1", schema: "boxes", key: "slots_boxId_fkey" },
    slotBookings: {
      relation: "*",
      schema: "slotBookings",
      key: "slotBookings_slotId_fkey",
    },
  },
} as const;

const siteSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  hllStatusId: z.number().int().optional(),
  disabled: z.boolean().optional(),
  openingHours: z.string().optional(),
  url: z.string(),
  directions: z.string(),
  status: siteStatus.optional(),
});
export const sites = {
  schema: siteSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    boxGroups: {
      relation: "*",
      schema: "boxGroups",
      key: "boxGroups_siteId_fkey",
    },
  },
} as const;

const articleSchema = z.object({
  id: z.string().uuid(),
  type: articleType,
  name: z.string(),
  categoryName: z.string().optional(),
  sra: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  slug: z.string().optional(),
  length: z.number().int().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  hllManufacturerModelId: z.string().optional(),
  hllFleetModelId: z.string().optional(),
  preferredCount: z.number().int(),
  price: z.number().int(),
});
export const articles = {
  schema: articleSchema,
  primaryKey: "id",
  defaults: ["id", "type"],
  refs: {
    articlesPackages: {
      relation: "*",
      schema: "articlesPackages",
      key: "articlesPackages_articleId_fkey",
    },
    slotBookingsReferences: {
      relation: "*",
      schema: "slotBookingsReferences",
      key: "slotBookingsReferences_articleId_fkey",
    },
    articleImages: {
      relation: "*",
      schema: "articleImages",
      key: "articleImages_articleId_fkey",
    },
    hllArticles: {
      relation: "*",
      schema: "hllArticles",
      key: "hllArticles_articleId_fkey",
    },
  },
} as const;

const packageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
export const packages = {
  schema: packageSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    articlesPackages: {
      relation: "*",
      schema: "articlesPackages",
      key: "articlesPackages_packageId_fkey",
    },
  },
} as const;

const articlesPackageSchema = z.object({
  id: z.string().uuid(),
  articleId: z.string().uuid(),
  packageId: z.string().uuid(),
});
export const articlesPackages = {
  schema: articlesPackageSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    article: {
      relation: "1",
      schema: "articles",
      key: "articlesPackages_articleId_fkey",
    },
    package: {
      relation: "1",
      schema: "packages",
      key: "articlesPackages_packageId_fkey",
    },
  },
} as const;

const bookingSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  status: bookingStatus,
  hllOrderNumber: z.string().optional(),
});
export const bookings = {
  schema: bookingSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    slotBookings: {
      relation: "*",
      schema: "slotBookings",
      key: "slotBookings_bookingId_fkey",
    },
    bookingAccesses: {
      relation: "*",
      schema: "bookingAccesses",
      key: "bookingAccesses_bookingId_fkey",
    },
    payment: {
      relation: "1",
      schema: "payments",
      key: "payments_bookingId_fkey",
    },
  },
} as const;

const slotBookingSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  status: bookingStatus,
  type: bookingType,
  slotId: z.string().uuid(),
  bookingId: z.string().uuid().optional(),
});
export const slotBookings = {
  schema: slotBookingSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    bleLogs: {
      relation: "*",
      schema: "bleLogs",
      key: "bleLogs_slotBookingId_fkey",
    },
    slot: { relation: "1", schema: "slots", key: "slotBookings_slotId_fkey" },
    booking: {
      relation: "1",
      schema: "bookings",
      key: "slotBookings_bookingId_fkey",
    },
    slotBookingsReferences: {
      relation: "*",
      schema: "slotBookingsReferences",
      key: "slotBookingsReferences_slotBookingId_fkey",
    },
  },
} as const;

const slotBookingsReferenceSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  name: z.string(),
  references: z.array(z.string()).optional(),
  slotBookingId: z.string().uuid(),
  articleId: z.string().uuid().optional(),
});
export const slotBookingsReferences = {
  schema: slotBookingsReferenceSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    slotBooking: {
      relation: "1",
      schema: "slotBookings",
      key: "slotBookingsReferences_slotBookingId_fkey",
    },
    article: {
      relation: "1",
      schema: "articles",
      key: "slotBookingsReferences_articleId_fkey",
    },
  },
} as const;

const bookingAccessSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  bookingId: z.string().uuid(),
  profileId: z.string().uuid(),
});
export const bookingAccesses = {
  schema: bookingAccessSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    booking: {
      relation: "1",
      schema: "bookings",
      key: "bookingAccesses_bookingId_fkey",
    },
    profile: {
      relation: "1",
      schema: "profiles",
      key: "bookingAccesses_profileId_fkey",
    },
  },
} as const;

const identificationSchema = z.object({
  id: z.string().uuid(),
  status: identificationStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
  personalNumber: z.string().optional(),
});
export const identifications = {
  schema: identificationSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt", "updatedAt"],
  refs: {},
} as const;

const articleImageSchema = z.object({
  name: z.string(),
  articleId: z.string().uuid(),
});
export const articleImages = {
  schema: articleImageSchema,
  primaryKey: "name",
  defaults: [],
  refs: {
    article: {
      relation: "1",
      schema: "articles",
      key: "articleImages_articleId_fkey",
    },
  },
} as const;

const hllArticleSchema = z.object({
  id: z.string().uuid(),
  fleetModelId: z.string().optional(),
  manufacturerModelId: z.string().optional(),
  articleId: z.string().uuid().optional(),
});
export const hllArticles = {
  schema: hllArticleSchema,
  primaryKey: "id",
  defaults: ["id"],
  refs: {
    article: {
      relation: "1",
      schema: "articles",
      key: "hllArticles_articleId_fkey",
    },
  },
} as const;

const creditReportSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  raw: z.string(),
  profileId: z.string().uuid(),
});
export const creditReports = {
  schema: creditReportSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    profile: {
      relation: "1",
      schema: "profiles",
      key: "creditReports_profileId_fkey",
    },
  },
} as const;

const paymentSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  status: paymentStatus,
  bookingId: z.string().uuid(),
});
export const payments = {
  schema: paymentSchema,
  primaryKey: "id",
  defaults: ["id", "createdAt"],
  refs: {
    booking: {
      relation: "1",
      schema: "bookings",
      key: "payments_bookingId_fkey",
    },
  },
} as const;

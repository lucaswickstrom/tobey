"use server";

import { z } from "zod";
import { sendSms } from "@/helpers/twilioApi";

const schema = z.object({
  phone: z.string(),
  // .refine((phone) => parsePhoneNumber(phone).valid, "Invalid phone number"),
});

export async function sendAppLink(form: FormData) {
  const { phone } = schema.parse(Object.fromEntries(form));
  await sendSms(phone, "Hämta Tobey-appen på https://tobey.io/download");
  return true;
}

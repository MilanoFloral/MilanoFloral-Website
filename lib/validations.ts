import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(150),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  eventDate: z.string().trim().max(30).optional().or(z.literal("")),
  eventType: z.string().trim().min(2, "Please select an event type").max(80),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more about your celebration").max(2000),
  website: z.string().max(0).optional()
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(150)
});

export type ContactInput = z.infer<typeof contactSchema>;

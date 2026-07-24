import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(3, "Subjek wajib diisi"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

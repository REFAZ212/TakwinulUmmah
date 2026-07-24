import { z } from "zod";

export const admissionSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  unit: z.enum(["PESANTREN", "SMP", "SMA"], { message: "Pilih unit tujuan" }),
  parentName: z.string().min(3, "Nama orang tua/wali wajib diisi"),
  phone: z.string().min(9, "Nomor telepon tidak valid"),
  email: z.string().email("Format email tidak valid"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  previousSchool: z.string().min(2, "Asal sekolah wajib diisi"),
  message: z.string().optional(),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;

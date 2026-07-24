"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionSchema, type AdmissionFormValues } from "@/types/admission";
import { publicApi } from "@/lib/api";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function AdmissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormValues>({ resolver: zodResolver(admissionSchema) });

  const onSubmit = async (values: AdmissionFormValues) => {
    setStatus("loading");
    try {
      await publicApi.post("/admissions", values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-sage/10 p-10 text-center">
        <CheckCircle2 className="text-sage" size={40} />
        <p className="font-display text-lg text-deep">Pendaftaran Terkirim</p>
        <p className="text-sm text-ink-soft">Panitia PPDB akan menghubungi Anda dalam 2x24 jam.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl bg-white p-6 shadow-md shadow-deep/5 ring-1 ring-black/5 sm:p-8">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-deep">Nama Lengkap Calon Santri</label>
        <input {...register("fullName")} className={inputClass} placeholder="Contoh: Ahmad Fauzan" />
        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-deep">Unit Tujuan</label>
        <select {...register("unit")} className={inputClass}>
          <option value="">Pilih unit</option>
          <option value="PESANTREN">Pondok Pesantren</option>
          <option value="SMP">SMP IT Takwinul Ummah</option>
          <option value="SMA">SMA IT Takwinul Ummah</option>
        </select>
        {errors.unit && <p className="mt-1 text-xs text-red-600">{errors.unit.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-deep">Nama Orang Tua/Wali</label>
          <input {...register("parentName")} className={inputClass} />
          {errors.parentName && <p className="mt-1 text-xs text-red-600">{errors.parentName.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-deep">No. WhatsApp</label>
          <input {...register("phone")} className={inputClass} placeholder="08xxxxxxxxxx" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-deep">Email</label>
        <input {...register("email")} type="email" className={inputClass} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-deep">Alamat Lengkap</label>
        <textarea {...register("address")} rows={2} className={inputClass} />
        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-deep">Asal Sekolah</label>
        <input {...register("previousSchool")} className={inputClass} />
        {errors.previousSchool && <p className="mt-1 text-xs text-red-600">{errors.previousSchool.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-deep">Pesan (Opsional)</label>
        <textarea {...register("message")} rows={2} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-deep shadow-md shadow-gold/30 transition hover:bg-gold-light disabled:opacity-60"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        Kirim Pendaftaran
      </button>
      {status === "error" && (
        <p className="text-center text-xs text-red-600">Gagal mengirim. Silakan coba lagi atau hubungi panitia via WhatsApp.</p>
      )}
    </form>
  );
}

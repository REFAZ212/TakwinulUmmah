"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/types/contact";
import { publicApi } from "@/lib/api";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("loading");
    try {
      await publicApi.post("/contact", values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-deep focus:ring-1 focus:ring-deep/20";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-10 text-center">
        <CheckCircle2 className="text-deep" size={36} />
        <p className="font-display text-lg font-semibold text-deep">Pesan Terkirim</p>
        <p className="text-sm text-ink-soft">Tim kami akan membalas secepatnya.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-white p-6 sm:p-8">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Nama</label>
        <input {...register("name")} className={inputClass} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
        <input {...register("email")} type="email" className={inputClass} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Subjek</label>
        <input {...register("subject")} className={inputClass} />
        {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Pesan</label>
        <textarea {...register("message")} rows={4} className={inputClass} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-deep px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-deep-2 disabled:opacity-60"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        Kirim Pesan
      </button>
    </form>
  );
}

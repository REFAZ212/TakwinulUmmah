import type { Metadata } from "next";
import ContactMap from "@/components/home/ContactMap";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = { title: "Kontak", description: "Hubungi Yayasan Takwinul Ummah." };

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-deep px-5 py-16 text-center lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Hubungi Kami</h1>
        <p className="mt-3 text-sm text-white/70">Kami siap membantu pertanyaan Anda seputar pendaftaran dan informasi pesantren</p>
      </section>
      <section className="mx-auto max-w-2xl px-5 py-20 lg:px-8">
        <ContactForm />
      </section>
      <ContactMap />
    </>
  );
}

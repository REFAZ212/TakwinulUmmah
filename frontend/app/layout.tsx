import type { Metadata } from "next";
import { Lato, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-utility",
  display: "swap",
});

const fontClassName = `${lato.variable} ${openSans.variable} ${roboto.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://takwinul-ummah.sch.id"),
  title: {
    default: "Yayasan Takwinul Ummah — Pesantren, SMP & SMA",
    template: "%s | Yayasan Takwinul Ummah",
  },
  description:
    "Yayasan Takwinul Ummah menaungi Pondok Pesantren, SMP, dan SMA dengan perpaduan pendidikan agama dan akademik yang unggul, berlandaskan akhlak dan ilmu.",
  keywords: ["pondok pesantren", "yayasan islam", "smp islam", "sma islam", "tahfidz", "boarding school"],
  openGraph: {
    title: "Yayasan Takwinul Ummah",
    description: "",
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={fontClassName}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

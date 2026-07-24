import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/shared/FloatingContact";
import RunningText from "@/components/shared/RunningText";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RunningText />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}

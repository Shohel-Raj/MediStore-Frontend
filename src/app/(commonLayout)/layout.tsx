import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar/>
      </div>
      
      <div className="min-h-screen pt-16">
        {children}
      </div>
      

      <Footer/>
    </div>
  );
}

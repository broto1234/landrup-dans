import Hero from "@/components/home/Hero";
import Holdtyper from "@/components/home/Holdtyper";
import Nyhedsbrev from "@/components/home/newsletter/Nyhedsbrev";
import KunderSiger from "@/components/home/comment/KunderSiger";
import ContactForm from "@/components/home/contact-form/ContactForm";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-background text-foreground">
      <main className="flex flex-col pb-8">
        <Hero />  
        <Holdtyper />    
        <Nyhedsbrev />  
        <KunderSiger />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}

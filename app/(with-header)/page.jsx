import Hero from "@/components/home/Hero";
import HomeData from "@/components/home/HomeData";
import NewsLetterForm from "@/components/forms/newsletter/NewsLetterForm";
import ContactForm from "@/components/forms/contact-form/ContactForm";
import Footer from "@/components/home/Footer";
import Testimonial from "../../components/home/comment/Testimonial";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-bgColor text-foreground">
      <main className="flex flex-col pb-8">
        <Hero />  
        <HomeData />    
        <NewsLetterForm />  
        <Testimonial />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}

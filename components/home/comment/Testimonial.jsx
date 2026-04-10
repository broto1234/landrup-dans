import { getAllTestimonials } from "@/services/testimonial/testimonials-service";
import CommentCard from "./CommentCard";

export default async function Testimonial() {
  const testimonials = await getAllTestimonials();
  // console.log("Testimonials in component:", testimonials);

  return (
    <section className="bg-blue-950">
      <CommentCard testimonials={testimonials} />
    </section>
  );
}
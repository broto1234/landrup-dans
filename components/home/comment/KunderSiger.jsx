import { getAllTestimonials } from "@/lib/dal";
import CommentCard from "./CommentCard";

export default async function KunderSiger() {
  const testimonials = await getAllTestimonials();
  console.log("Testimonials in component:", testimonials);

  return (
    <section className="bg-blue-950">
      <CommentCard testimonials={testimonials} />
    </section>
  );
}
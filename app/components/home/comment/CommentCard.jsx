"use client";

import { useState } from "react";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

export default function CommentCard( {testimonials} ) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-center mb-6">Det siger vores <br /> kunder om os</h2>
        <div className="text-center">
          <div className="flex flex-col justify-between mb-4 h-32 space-y-2">
            <p className="text-xs italic">{currentTestimonial.content}</p>
            <div className="flex flex-col -space-y-1">
              <span className="font-semibold">{currentTestimonial.name}</span>
              <span className="text-xs">{currentTestimonial.occupation}</span>
            </div>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <TfiArrowCircleLeft className="hover:text-orange-700 cursor-pointer" size={40} onClick={handlePrev} />
            <TfiArrowCircleRight className="hover:text-orange-700 cursor-pointer" size={40} onClick={handleNext} />
          </div>
        </div>
      </section>
  )
}

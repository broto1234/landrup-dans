const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllTestimonials() { 
  const res = await fetch(`${BASE_URL}/api/v1/testimonials`);
  // console.log(res);
  
  if(!res.ok){
    const text = await res.json();
    const errorMessage = text.message || "Failed to fetch testimonials";
    throw new Error(errorMessage);
  }  

  return await res.json();
}
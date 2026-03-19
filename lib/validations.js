import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Write a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.email("Write a valid email address"),
});

export const loginSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const registerSchema = z.object({
  firstname: z.string().min(2, "Fornavn skal være mindst 2 karakterer"),
  lastname: z.string().min(2, "Efternavn skal være mindst 2 karakterer"),
  username: z.string().min(5, "Brugernavn skal være mindst 5 karakterer"),
  age: z.coerce.number().min(15, "Du skal være mindst 15 år gammel"),
  password: z.string().min(4, "Kodeord skal være mindst 4 karakterer"),
  confirmPassword: z.string().min(4, "Bekræft kodeord skal være mindst 4 karakterer"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Kodeord og bekræft kodeord skal være ens",
   path: ["confirmPassword"],
});
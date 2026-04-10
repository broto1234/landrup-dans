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
    firstname: z.string().min(2, "First name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
    username: z.string().min(5, "Username must be at least 5 characters"),
    age: z.coerce.number().min(15, "You must be at least 15 years old"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(4, "Confirm password must be at least 4 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const activitySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  weekday: z.string().min(2, "Weekday must be at least 2 characters"),
  time: z.string().min(5, "Time must be at least 5 characters"),
  maxParticipants: z.coerce.number().min(1, "Maximum participants must be at least 1"),
  minAge: z.coerce.number().min(0, "Minimum age must be at least 0"),
  maxAge: z.coerce.number().min(0, "Maximum age must be at least 0"),
  file: z.instanceof(File).refine(file => file.size > 0, "File is required"),
});
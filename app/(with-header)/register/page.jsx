import RegisterForm from "@/components/forms/register-form/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-lg mb-2">Register</h1>
      <RegisterForm />
    </section>
  );
}
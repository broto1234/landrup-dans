import LoginForm from "@/components/forms/login-form/LoginForm";

export default function LoginPage() {
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-base">Log ind</h1>
      <LoginForm />
    </section>
  );
}
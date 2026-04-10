import CreateActivityForm from "@/components/forms/create-activity-form/CreateActivityForm";

export default function CreateActivityPage() {
  return (
    <section className="container mx-auto px-4 flex flex-col items-center gap-6 h-[93vh] justify-center">
      <h1 className="text-lg mb-4">Create a new activity</h1>
      <CreateActivityForm />
    </section>
  );
}
import { AppointmentForm } from "@/components/appointment/AppointmentForm";

export const metadata = {
  title: "Book Appointment | Dr. Anisa Sarvath",
  description: "Schedule your consultation for holistic Ayurvedic healthcare.",
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground text-lg">
            Take the first step towards holistic wellness. Choose a time that works best for you, either online or in-person.
          </p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-primary/10">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}

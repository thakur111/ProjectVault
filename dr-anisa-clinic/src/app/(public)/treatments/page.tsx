import { TreatmentsSection } from "@/components/home/TreatmentsSection";

export const metadata = {
  title: "Holistic Treatments | Dr. Anisa Sarvath",
  description: "Explore our range of Ayurvedic treatments for PCOS, Thyroid, Infertility, and more.",
};

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-4xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Ayurvedic Treatments</h1>
        <p className="text-muted-foreground text-lg">
          At Dr. Anisa Sarvath's Clinic, we believe in treating the individual, not just the disease. 
          Our comprehensive treatment protocols combine ancient Ayurvedic wisdom with modern clinical understanding 
          to provide you with the most effective, natural solutions.
        </p>
      </div>
      <TreatmentsSection />
    </div>
  );
}

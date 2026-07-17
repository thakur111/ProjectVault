import { Hero } from "@/components/home/Hero";
import { TreatmentsSection } from "@/components/home/TreatmentsSection";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <TreatmentsSection />

      {/* Patient Journey / CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-heading font-bold mb-6">Begin Your Journey to True Wellness</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Ayurveda is not just about treating symptoms; it's about finding the root cause and restoring harmony to your body, mind, and spirit. Let us guide you back to health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment" className={buttonVariants({ size: "lg", className: "rounded-full h-14 px-8 text-lg" })}>
              Schedule a Consultation
            </Link>
            <Link href="/about" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full h-14 px-8 text-lg bg-white" })}>
              Explore Our Process
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

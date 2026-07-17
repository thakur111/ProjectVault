import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Placeholder data - in a real app, this comes from Prisma/CMS
const treatmentData = {
  "pcos-pcod": {
    title: "PCOS / PCOD Treatment",
    description: "Holistic management of Polycystic Ovary Syndrome through Ayurveda.",
    symptoms: ["Irregular periods", "Weight gain", "Acne", "Hair fall", "Hormonal imbalance"],
    approach: "We focus on balancing the Apana Vata and Pitta doshas. Treatment includes specific Ayurvedic herbs, detoxification (Panchakarma if needed), and a strict diet to improve insulin resistance and hormone balance."
  },
  "thyroid-disorders": {
    title: "Thyroid Disorders",
    description: "Natural regulation of Hypo and Hyperthyroidism.",
    symptoms: ["Weight fluctuations", "Fatigue", "Hair loss", "Mood swings"],
    approach: "Ayurveda views thyroid issues as a Kapha-Pitta imbalance. We use herbs like Kanchanar and Ashwagandha to stimulate the thyroid gland naturally, coupled with stress-management techniques."
  },
  "infertility": {
    title: "Infertility Treatment",
    description: "Enhance fertility naturally with detox therapies, diet, and lifestyle modifications.",
    symptoms: ["Irregular cycles", "Hormonal imbalance", "Endometriosis", "Low ovarian reserve"],
    approach: "We focus on purifying the reproductive tissues (Shukra Dhatu) using Panchakarma, specific herbal tonics like Shatavari, and stress-reduction therapies to naturally support conception."
  },
  "weight-management": {
    title: "Ayurvedic Weight Management",
    description: "Achieve healthy, sustainable weight loss without extreme diets using Ayurvedic principles.",
    symptoms: ["Stubborn weight gain", "Sluggish metabolism", "Fluid retention", "Lethargy"],
    approach: "Weight gain is primarily a Kapha imbalance. We stimulate Agni (digestive fire) through targeted diets, Udvartana (herbal powder massage), and deep internal cleansing."
  },
  "skin-hair": {
    title: "Skin & Hair Care",
    description: "Restore your natural glow and prevent hair fall with our specialized detox protocols.",
    symptoms: ["Acne / Rosacea", "Severe hair fall", "Premature graying", "Eczema / Psoriasis"],
    approach: "Skin and hair issues stem from Pitta and Rakta (blood) impurities. We use blood-purifying herbs, localized treatments like Shirodhara for hair, and personalized dietary cooling."
  },
  "menstrual-disorders": {
    title: "Menstrual Disorders",
    description: "Relief from pain, heavy bleeding, and irregular cycles with gentle Ayurvedic care.",
    symptoms: ["Severe cramps", "Heavy / prolonged bleeding", "Scanty flow", "PMS"],
    approach: "Vata dosha governs menstruation. By regulating Apana Vayu through specific formulations and therapies, we can normalize flow, reduce inflammation, and eliminate pain safely."
  }
};

export default async function TreatmentDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // @ts-ignore
  const treatment = treatmentData[resolvedParams.slug];
  
  if (!treatment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section className="bg-primary/5 pt-12 pb-20 border-b border-primary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/treatments" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Treatments
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            {treatment.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {treatment.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-slate-900">The Ayurvedic Approach</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {treatment.approach}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-slate-900">Common Symptoms</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {treatment.symptoms.map((symptom: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 text-center">
              <h3 className="font-heading font-bold text-xl mb-4">Start Your Healing Journey</h3>
              <p className="text-sm text-slate-500 mb-6">
                Consult with Dr. Anisa Sarvath for a personalized treatment plan.
              </p>
              <Link href="/book-appointment" className={buttonVariants({ size: "lg", className: "w-full bg-primary text-white hover:bg-primary/90 rounded-xl mb-3" })}>
                Book Consultation
              </Link>
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full border-primary text-primary hover:bg-primary/5 rounded-xl" })}>
                Contact Us
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}

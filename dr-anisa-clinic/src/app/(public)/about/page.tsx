import { ClinicLogo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, GraduationCap, Award, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Dr. Anisa Sarvath | Ayurvedic Healthcare",
  description: "Learn more about Dr. Anisa Sarvath, a leading Ayurvedic doctor specializing in women's health.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-tight mb-6">
                Healing the <span className="text-primary italic">Root Cause</span> Naturally
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With a deep understanding of ancient Ayurvedic science and modern clinical experience, Dr. Anisa Sarvath provides holistic, personalized care for women's health issues, ensuring long-lasting wellness without harmful side effects.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book-appointment" className={buttonVariants({ size: "lg", className: "bg-primary text-white hover:bg-primary/90 text-md rounded-full px-8" })}>
                  Book Consultation
                </Link>
                <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline", className: "border-primary text-primary hover:bg-primary/5 text-md rounded-full px-8" })}>
                  Contact Clinic
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-[3rem] transform rotate-3 translate-x-4 translate-y-4"></div>
              <div className="relative bg-white p-4 rounded-[3rem] shadow-xl">
                <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden relative">
                  {/* Placeholder for Doctor's Image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                    <ClinicLogo className="w-32 h-32 opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <GraduationCap className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-heading font-bold mb-3">Qualifications</h3>
              <p className="text-slate-600 text-sm">
                BAMS, DSCF. Extensive clinical training in holistic women's care and classical Ayurvedic formulations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <HeartHandshake className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm">
                To empower women to reclaim their health and vitality through natural, personalized, and compassionate Ayurvedic care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Award className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-heading font-bold mb-3">Experience</h3>
              <p className="text-slate-600 text-sm">
                Years of dedicated clinical practice treating complex cases of PCOS, thyroid disorders, and infertility with high success rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">The Ayurvedic Approach</h2>
          <p className="text-lg text-primary-foreground/90 leading-relaxed mb-12">
            Ayurveda is not just a system of medicine; it's a science of life. We don't just suppress symptoms; we dig deep to find the root cause of the imbalance in your doshas (Vata, Pitta, Kapha). Through a combination of herbal medicines, specific diet plans, and lifestyle modifications, we restore your body's natural state of health.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              "Personalized Treatment Plans",
              "100% Natural & Safe",
              "Focus on Diet & Lifestyle",
              "Long-lasting Results",
              "Mind-Body Connection",
              "Compassionate Ongoing Support"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                <span className="font-medium text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

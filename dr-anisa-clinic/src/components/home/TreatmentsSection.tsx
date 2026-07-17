"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const treatments = [
  {
    title: "PCOS & PCOD",
    slug: "pcos-pcod",
    description: "Natural hormone balance and holistic cycle regulation through customized Ayurvedic therapies.",
    icon: "🌸"
  },
  {
    title: "Thyroid Care",
    slug: "thyroid-disorders",
    description: "Rejuvenate your metabolism and energy levels with specialized root-cause treatments.",
    icon: "🦋"
  },
  {
    title: "Infertility",
    slug: "infertility",
    description: "Enhance fertility naturally with detox therapies, diet, and lifestyle modifications.",
    icon: "🌱"
  },
  {
    title: "Weight Management",
    slug: "weight-management",
    description: "Achieve healthy, sustainable weight loss without extreme diets using Ayurvedic principles.",
    icon: "⚖️"
  },
  {
    title: "Skin & Hair",
    slug: "skin-hair",
    description: "Restore your natural glow and prevent hair fall with our specialized detox protocols.",
    icon: "✨"
  },
  {
    title: "Menstrual Disorders",
    slug: "menstrual-disorders",
    description: "Relief from pain, heavy bleeding, and irregular cycles with gentle Ayurvedic care.",
    icon: "🌺"
  }
];

export function TreatmentsSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary font-medium">
            <Leaf className="w-5 h-5" />
            <span>Our Expertise</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Holistic Treatments
          </h2>
          <p className="text-muted-foreground text-lg">
            We focus on the root cause of your health concerns, offering personalized Ayurvedic therapies for lasting wellness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/treatments/${treatment.slug}`}>
                <Card className="h-full border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-background/50 backdrop-blur-sm group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      {treatment.icon}
                    </div>
                    <CardTitle className="font-heading text-xl">{treatment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-6 line-clamp-3">
                      {treatment.description}
                    </CardDescription>
                    <div className={buttonVariants({ variant: "ghost", className: "p-0 text-primary hover:bg-transparent hover:text-primary/80 group/btn" })}>
                      Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

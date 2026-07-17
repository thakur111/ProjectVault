"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4">
            Ayurvedic Women's Healthcare Clinic
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1]">
            Every Health Concern,<br />
            <span className="text-primary italic">A Natural Solution.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Experience holistic, personalized care for PCOS, thyroid, infertility, and more. 
            Dr. Anisa Sarvath brings centuries of Ayurvedic wisdom to modern women's wellness.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="rounded-full h-14 px-8 text-lg font-medium shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <CalendarDays className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-medium border-primary/20 text-primary hover:bg-primary/5 hover:scale-105 transition-transform">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Consultation
            </Button>
          </div>
          
          <div className="flex items-center gap-4 pt-8">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary/30 flex items-center justify-center text-primary text-xs font-bold">
                  ★
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">10,000+</span> happy patients
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[40px] transform rotate-3" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-2xl overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <span className="text-primary font-heading text-4xl">Dr.</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Dr. Anisa Sarvath</h3>
              <p className="text-primary font-medium">BAMS, MD (Ayurveda)</p>
            </div>
          </div>
          
          {/* Floating glass card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              ✨
            </div>
            <div>
              <p className="font-bold text-foreground">15+ Years</p>
              <p className="text-sm text-muted-foreground">Of Excellence</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

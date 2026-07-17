import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ | Dr. Anisa Sarvath Clinic",
  description: "Frequently Asked Questions about Ayurvedic treatments.",
};

export default function FAQPage() {
  const faqs = [
    { id: "1", question: "What is Panchakarma?", answer: "Panchakarma is an Ayurvedic detoxification program that helps cleanse the body of deep-rooted toxins, balancing the doshas and restoring overall health.", category: "Treatments" },
    { id: "2", question: "How long does PCOS treatment typically take?", answer: "Ayurvedic treatment for PCOS addresses the root cause rather than just symptoms. While some patients see improvements in 2-3 months, a complete holistic protocol usually takes 6-9 months depending on the chronicity.", category: "Treatments" },
    { id: "3", question: "Do I need to follow a strict diet?", answer: "Yes, diet (Ahara) is considered half the medicine in Ayurveda. Your treatment plan will include specific dietary guidelines tailored to your dominant dosha and current imbalance.", category: "General" },
    { id: "4", question: "Are your medicines safe to take with allopathic drugs?", answer: "Generally, yes, but it is crucial that you disclose all current medications during your consultation so Dr. Anisa can ensure there are no contraindications.", category: "Medicine" },
    { id: "5", question: "Do you offer online consultations?", answer: "Yes! We offer video and audio consultations for patients who cannot visit the clinic in person. Medicines can be shipped to your address.", category: "Booking" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Find answers to common questions about Ayurveda, our treatments, and what to expect during your healing journey.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-slate-200 rounded-xl px-6 data-[state=open]:shadow-sm">
                <AccordionTrigger className="text-left font-bold text-lg text-slate-900 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

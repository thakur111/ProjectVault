import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Patient Testimonials | Dr. Anisa Sarvath Clinic",
  description: "Read success stories and experiences from our patients.",
};

export default function TestimonialsPage() {
  // Mock data for UI rendering
  const testimonials = [
    { id: "1", name: "Anjali M.", content: "Dr. Anisa completely changed my life. My PCOS symptoms are gone, and my cycles are regular for the first time in years. The Ayurvedic approach was gentle but incredibly effective.", rating: 5, date: "October 12, 2025" },
    { id: "2", name: "Kavya R.", content: "The thyroid treatment was incredibly effective. Very grateful for her deep understanding of hormonal balance.", rating: 5, date: "November 03, 2025" },
    { id: "3", name: "Priya S.", content: "I struggled with infertility for 4 years before consulting Dr. Anisa. Her Panchakarma recommendations and herbal medicines helped us conceive naturally. She is a blessing.", rating: 5, date: "January 18, 2026" },
    { id: "4", name: "Rishabh K.", content: "Excellent clinic for holistic wellness. My chronic digestive issues were resolved within 2 months of following her diet and medicine plan.", rating: 4, date: "February 22, 2026" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Patient Stories
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Real experiences from people who have embraced Ayurveda to heal naturally and restore their health.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="flex text-accent mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

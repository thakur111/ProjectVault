import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "FAQ CMS | Admin",
};

export default function AdminFAQPage() {
  // Mock Data
  const faqs = [
    { id: "1", question: "What is Panchakarma?", answer: "Panchakarma is an Ayurvedic detoxification program...", category: "General" },
    { id: "2", question: "How long does PCOS treatment take?", answer: "It varies from patient to patient, but typically...", category: "Treatments" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Frequently Asked Questions</h1>
          <p className="text-slate-500 mt-1">Manage the questions that appear on your FAQ page.</p>
        </div>
        <Button className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 md:p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className="pt-1 cursor-move text-slate-300 hover:text-slate-500">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{faq.question}</span>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 uppercase tracking-wider">
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

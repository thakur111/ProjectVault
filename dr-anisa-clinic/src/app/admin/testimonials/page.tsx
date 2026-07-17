import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Trash2, CheckCircle, XCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Testimonials CMS | Admin",
};

export default function AdminTestimonialsPage() {
  // Mock Data
  const testimonials = [
    { id: "1", name: "Anjali M.", content: "Dr. Anisa completely changed my life. My PCOS symptoms are gone!", rating: 5, published: true, date: "Oct 12, 2025" },
    { id: "2", name: "Kavya R.", content: "The thyroid treatment was incredibly effective. Very grateful.", rating: 5, published: false, date: "Nov 03, 2025" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Patient Testimonials</h1>
          <p className="text-slate-500 mt-1">Manage and approve patient success stories.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search testimonials..." className="pl-9 bg-white" />
          </div>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Manually
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Patient Name</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Review Snippet</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Rating</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 truncate max-w-sm">"{t.content}"</div>
                      <div className="text-xs text-slate-400 mt-1">{t.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex text-amber-400">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {t.published ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <CheckCircle className="h-3 w-3 mr-1" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <XCircle className="h-3 w-3 mr-1" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="outline" size="sm">
                        {t.published ? 'Hide' : 'Approve'}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

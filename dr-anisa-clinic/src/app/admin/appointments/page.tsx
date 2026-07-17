import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Manage Appointments | Admin",
};

export default async function AdminAppointmentsPage() {
// Temporarily using mock data for local UI demonstration without a DB connection
  const appointments = [
    { id: "1", name: "Sarah Jenkins", phone: "+91 9876543210", email: "sarah@example.com", reason: "PCOS Consultation", preferredDate: new Date(), preferredTime: "10:00 AM", mode: "offline", status: "pending" },
    { id: "2", name: "Priya Sharma", phone: "+91 9876512345", email: "priya@example.com", reason: "Thyroid Checkup", preferredDate: new Date(), preferredTime: "02:30 PM", mode: "online", status: "confirmed" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 mt-1">Manage and view all patient booking requests.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search patient..." className="pl-9 bg-white" />
          </div>
          <Button variant="outline" className="bg-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
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
                  <th className="px-6 py-4 font-medium text-slate-600">Contact</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Requested Date</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Treatment</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Mode</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>No appointments found.</p>
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{apt.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600">{apt.phone}</div>
                        <div className="text-xs text-slate-400">{apt.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900">{new Date(apt.preferredDate).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-500">{apt.preferredTime}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{apt.reason}</td>
                      <td className="px-6 py-4">
                        <span className="capitalize px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {apt.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`capitalize px-2.5 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

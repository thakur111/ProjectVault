import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Search, Filter, Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const metadata = {
  title: "Patient Directory | Admin",
};

export default async function AdminPatientsPage() {
// Temporarily using mock data for local UI demonstration
  const patients = [
    { id: "PAT-001", name: "Sarah Jenkins", phone: "+91 9876543210", email: "sarah@example.com", _count: { appointments: 3 }, createdAt: new Date() },
    { id: "PAT-002", name: "Priya Sharma", phone: "+91 9876512345", email: "priya@example.com", _count: { appointments: 1 }, createdAt: new Date() },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Patient Directory</h1>
          <p className="text-slate-500 mt-1">Manage patient records and medical history.</p>
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
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Patient ID</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Name & Contact</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Total Visits</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Registration Date</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <FileText className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>No patients found. Add a patient to get started.</p>
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">
                        {patient.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{patient.name}</div>
                        <div className="text-slate-500">{patient.phone}</div>
                        {patient.email && <div className="text-xs text-slate-400">{patient.email}</div>}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-slate-100 text-xs font-medium">
                          {patient._count.appointments} Appointments
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/patients/${patient.id}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "text-primary hover:text-primary/80" })}>
                          View Record
                        </Link>
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

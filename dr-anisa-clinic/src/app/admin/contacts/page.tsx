import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Mail, Reply, Trash2, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Inbox | Admin",
};

export default function AdminContactsPage() {
  // Mock Data
  const messages = [
    { id: "1", name: "Ravi Kumar", email: "ravi.kumar@example.com", phone: "+91 99887 76655", subject: "Query regarding Panchakarma duration", message: "Hello Dr. Anisa, I am suffering from severe joint pain and was recommended Panchakarma. How many days does the treatment typically last for arthritis?", status: "unread", date: "Today, 10:45 AM" },
    { id: "2", name: "Sneha Reddy", email: "sneha.r@example.com", phone: "+91 88776 65544", subject: "Dietary consultation for weight loss", message: "I would like to know if you provide online consultations purely for diet and lifestyle management for Kapha body types.", status: "read", date: "Yesterday, 2:15 PM" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Patient Inbox</h1>
          <p className="text-slate-500 mt-1">Manage inquiries from the public website contact form.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search messages..." className="pl-9 bg-white" />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Sender Details</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Message Content</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Received On</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <Mail className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>Your inbox is empty.</p>
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className={`hover:bg-slate-50 transition-colors ${msg.status === 'unread' ? 'bg-primary/5' : ''}`}>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${msg.status === 'unread' ? 'text-slate-900' : 'text-slate-700'}`}>{msg.name}</div>
                        <div className="text-slate-500">{msg.phone}</div>
                        <div className="text-xs text-slate-400">{msg.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-medium mb-1 ${msg.status === 'unread' ? 'text-slate-900' : 'text-slate-700'}`}>{msg.subject}</div>
                        <div className="text-slate-600 line-clamp-2 max-w-lg">{msg.message}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {msg.date}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                          <Reply className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
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

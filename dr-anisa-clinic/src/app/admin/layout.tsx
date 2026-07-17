import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Calendar, Users, FileText, Settings, LogOut, MessageSquare, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="font-heading font-bold text-xl text-primary">Clinic Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg font-medium">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/appointments" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <Calendar className="h-5 w-5" />
            Appointments
          </Link>
          <Link href="/admin/patients" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <Users className="h-5 w-5" />
            Patients
          </Link>
          <Link href="/admin/contacts" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <Mail className="h-5 w-5" />
            Inbox
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <FileText className="h-5 w-5" />
            Blogs
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <MessageSquare className="h-5 w-5" />
            Testimonials
          </Link>
          <Link href="/admin/faq" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <HelpCircle className="h-5 w-5" />
            FAQs
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-3 py-2 text-slate-600">
            {/* <UserButton afterSignOutUrl="/" /> */}
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <span className="font-medium text-sm">Admin User</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mt-auto">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-2xl text-white">Dr. Anisa Sarvath</h3>
          <p className="text-sm leading-relaxed">Premium Ayurvedic Women's Healthcare Clinic specializing in holistic, natural treatments.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Treatments</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/treatments/pcos-pcod" className="hover:text-white transition-colors">PCOS & PCOD</Link></li>
            <li><Link href="/treatments/thyroid-disorders" className="hover:text-white transition-colors">Thyroid Care</Link></li>
            <li><Link href="/treatments/infertility" className="hover:text-white transition-colors">Infertility</Link></li>
            <li><Link href="/treatments/weight-management" className="hover:text-white transition-colors">Weight Management</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/book-appointment" className="hover:text-white transition-colors">Book Appointment</Link></li>
            <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>+91 74834 52036</li>
            <li>hello@dranisaclinic.com</li>
            <li>Kadur, Chikkamagaluru, Karnataka</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

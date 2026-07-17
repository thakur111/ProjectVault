import Link from "next/link";

export const metadata = {
  title: "Privacy Policy & Terms | Dr. Anisa Sarvath Clinic",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Last updated: July 17, 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl prose prose-slate prose-a:text-primary hover:prose-a:text-primary/80">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Dr. Anisa Sarvath's Ayurvedic Clinic website. By accessing our website and utilizing our services, you agree to be bound by the following terms and conditions. We are committed to protecting your privacy and ensuring your medical data is handled securely.
          </p>

          <h2>2. Medical Disclaimer</h2>
          <p>
            The information provided on this website, including blog posts, FAQs, and treatment descriptions, is for educational purposes only. It does not substitute professional medical advice, diagnosis, or treatment. Always consult with Dr. Anisa or another qualified healthcare provider regarding your health condition.
          </p>

          <h2>3. Data Collection & Privacy</h2>
          <p>
            We collect personal information such as your name, contact details, and medical history solely for the purpose of providing you with Ayurvedic healthcare services. We do not sell, rent, or share your personal medical information with third parties without your explicit consent, except as required by law.
          </p>
          <ul>
            <li><strong>Appointment Data:</strong> Information submitted via our booking forms is stored securely in our database.</li>
            <li><strong>Communication:</strong> If you contact us via email or our contact form, we retain that correspondence to assist with your inquiries.</li>
          </ul>

          <h2>4. Appointment Cancellations</h2>
          <p>
            We request that you provide at least 24 hours notice if you need to cancel or reschedule your appointment. This allows us to offer the time slot to other patients in need of care.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our Terms of Service, please contact us at:
            <br />
            <strong>Email:</strong> <Link href="mailto:hello@dranisaclinic.com">hello@dranisaclinic.com</Link>
            <br />
            <strong>Phone:</strong> +91 74834 52036
          </p>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";

export const metadata = {
  title: "Gallery | Dr. Anisa Sarvath Clinic",
  description: "Take a tour of our premium Ayurvedic healthcare facility.",
};

export default function GalleryPage() {
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop", alt: "Reception Area", category: "Facility" },
    { id: 2, src: "https://images.unsplash.com/photo-1600334129128-685054110214?q=80&w=2070&auto=format&fit=crop", alt: "Treatment Room", category: "Treatments" },
    { id: 3, src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop", alt: "Herbal Medicines", category: "Pharmacy" },
    { id: 4, src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop", alt: "Yoga Studio", category: "Facility" },
    { id: 5, src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop", alt: "Panchakarma Setup", category: "Treatments" },
    { id: 6, src: "https://images.unsplash.com/photo-1608228065096-3c2242008ff7?q=80&w=2070&auto=format&fit=crop", alt: "Consultation Room", category: "Facility" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Clinic Gallery
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Take a visual tour of our serene, state-of-the-art holistic healing center designed for your absolute comfort.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm border border-slate-200">
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                      {img.category}
                    </span>
                    <h3 className="text-white font-bold text-lg">{img.alt}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

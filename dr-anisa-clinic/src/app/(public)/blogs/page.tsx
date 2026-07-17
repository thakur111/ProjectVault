import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Health Blogs | Dr. Anisa Sarvath",
  description: "Read our latest articles on Ayurvedic wellness and women's health.",
};

// Placeholder data (will be fetched from Prisma)
const blogs = [
  {
    id: "1",
    title: "Understanding PCOS: An Ayurvedic Perspective",
    slug: "understanding-pcos-ayurveda",
    excerpt: "Learn how Ayurveda approaches PCOS through balancing the doshas, diet, and lifestyle changes.",
    category: "PCOS",
    date: "August 15, 2026",
  },
  {
    id: "2",
    title: "5 Herbs to Naturally Boost Your Thyroid Function",
    slug: "herbs-for-thyroid",
    excerpt: "Discover the top Ayurvedic herbs that can help rejuvenate your thyroid gland naturally.",
    category: "Thyroid",
    date: "August 10, 2026",
  },
  {
    id: "3",
    title: "Ayurvedic Diet Tips for Healthy Weight Loss",
    slug: "ayurvedic-weight-loss-diet",
    excerpt: "Ditch the extreme diets and embrace a holistic approach to sustainable weight management.",
    category: "Diet & Lifestyle",
    date: "August 5, 2026",
  }
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Wellness Insights</h1>
          <p className="text-muted-foreground text-lg">
            Explore our collection of articles on natural healing, Ayurvedic wisdom, and women's health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group">
              <Card className="h-full border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 bg-secondary/10 rounded-t-xl" />
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {blog.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{blog.date}</span>
                    <span className="text-primary font-medium flex items-center group-hover:underline">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

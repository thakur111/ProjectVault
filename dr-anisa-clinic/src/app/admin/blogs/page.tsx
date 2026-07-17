import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const metadata = {
  title: "Blog CMS | Admin",
};

export default async function AdminBlogsPage() {
// Temporarily using mock data for local UI demonstration
  const blogs = [
    { id: "1", title: "5 Ayurvedic Remedies for PCOS", slug: "5-ayurvedic-remedies-pcos", category: "Women's Health", published: true, createdAt: new Date() },
    { id: "2", title: "Understanding Thyroid Imbalance", slug: "understanding-thyroid", category: "Education", published: false, createdAt: new Date() },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 mt-1">Manage articles, health tips, and educational content.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search articles..." className="pl-9 bg-white" />
          </div>
          <Link href="/admin/blogs/new" className={buttonVariants({ className: "bg-primary text-white" })}>
            <Plus className="h-4 w-4 mr-2" />
            Write New Post
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Article Title</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Category</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Published Date</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <p>No blog posts found. Start writing to educate your patients!</p>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{blog.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-xs">{blog.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          blog.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link href={`/admin/blogs/${blog.id}`} className={buttonVariants({ variant: "ghost", size: "icon", className: "text-slate-500 hover:text-primary" })}>
                          <Edit className="h-4 w-4" />
                        </Link>
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

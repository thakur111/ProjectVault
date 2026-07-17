import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export const metadata = {
  title: "Create Blog Post | Admin",
};

export default function NewBlogPostPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blogs" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">New Blog Post</h1>
          <p className="text-slate-500 mt-1">Write and publish a new article.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Article Title</label>
                <Input placeholder="e.g. 5 Ayurvedic Remedies for PCOS" className="text-lg py-6" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Excerpt (Short Description)</label>
                <Textarea placeholder="A brief summary for the blog listing page..." className="h-20" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Content</label>
                <RichTextEditor />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                Save & Publish
              </Button>
              <Button variant="outline" className="w-full">
                Save as Draft
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <Input placeholder="e.g. Diet, PCOS, General" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">URL Slug</label>
                <Input placeholder="e.g. 5-ayurvedic-remedies-pcos" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Featured Image URL</label>
                <div className="flex gap-2">
                  <Input placeholder="https://..." />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

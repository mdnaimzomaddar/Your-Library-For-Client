"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/upload";
import { useTitle } from "@/lib/use-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/spinner";

const categories = [  "Fiction",
  "Science",
  "History",
  "Kids",
  "Technology",
  "Biography",
  "Religion",
  "Romance",
  "Mystery",
  "Self Help",
  "Poetry",
  "Others",];

export default function AddBookPage() {
  useTitle("Add Book");
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  if (isPending) return <Spinner />;
  const user = session?.user;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("image") as File;

    if (!category) {
      toast.error("একটি ক্যাটাগরি বেছে নাও");
      return;
    }
    if (!file || file.size === 0) {
      toast.error("বইয়ের একটি ছবি দাও");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category,
          image: imageUrl,
          description: form.get("description"),
          totalCopies: Number(form.get("totalCopies")),
          userName: user?.name,
          userEmail: user?.email,
        }),
      });
      toast.success("বই সফলভাবে যোগ হয়েছে!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "বই যোগ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Add a New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input id="author" name="author" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalCopies">Total Copies</Label>
                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min={1}
                  defaultValue={1}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Book Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" name="description" required rows={4} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input value={user?.name ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Your Email</Label>
                <Input value={user?.email ?? ""} readOnly />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
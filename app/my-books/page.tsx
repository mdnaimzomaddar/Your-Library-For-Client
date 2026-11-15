"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useTitle } from "@/lib/use-title";
import { Spinner } from "@/components/spinner";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Book } from "@/lib/types";

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

export default function MyBooksPage() {
  useTitle("My Books");
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<Book | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadBooks = useCallback(async () => {
    try {
      const all: Book[] = await apiFetch("/books");
      setBooks(all.filter((b) => b.userEmail === email));
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [email]);

useEffect(() => {
  if (!email) return;
  let ignore = false;
  apiFetch("/books")
    .then((all: Book[]) => {
      if (!ignore) setBooks(all.filter((b) => b.userEmail === email));
    })
    .catch(() => {
      if (!ignore) setBooks([]);
    })
    .finally(() => {
      if (!ignore) setLoading(false);
    });
  return () => {
    ignore = true;
  };
}, [email]);

  function openEdit(book: Book) {
    setEditing(book);
    setEditCategory(book.category);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const form = new FormData(e.currentTarget);

    setSaving(true);
    try {
      await apiFetch(`/books/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: editCategory,
          image: form.get("image"),
          description: form.get("description"),
        }),
      });
      toast.success("বই সফলভাবে আপডেট হয়েছে!");
      setEditing(null);
      await loadBooks();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "আপডেট করা যায়নি");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
      toast.success("বইটি মুছে ফেলা হয়েছে");
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "মোছা যায়নি");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (isPending || loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">My Books</h1>

      {books.length === 0 ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">তুমি এখনো কোনো বই যোগ করোনি।</p>
          <Button render={<Link href="/add-book" />}>Add Book</Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-16 w-12 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>
                    {book.availableCopies} / {book.totalCopies}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleting(book)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* এডিট মডাল */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {editing && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="e-title">Title</Label>
                <Input
                  id="e-title"
                  name="title"
                  defaultValue={editing.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-author">Author</Label>
                <Input
                  id="e-author"
                  name="author"
                  defaultValue={editing.author}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={editCategory}
                  onValueChange={(v) => setEditCategory(v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
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
                <Label htmlFor="e-image">Image URL</Label>
                <Input
                  id="e-image"
                  name="image"
                  defaultValue={editing.image}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-desc">Description</Label>
                <Textarea
                  id="e-desc"
                  name="description"
                  defaultValue={editing.description}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ডিলিট কনফার্ম মডাল */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this book?</DialogTitle>
            <DialogDescription>
              &quot;{deleting?.title}&quot; বইটি স্থায়ীভাবে মুছে যাবে। এটা আর
              ফেরানো যাবে না।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
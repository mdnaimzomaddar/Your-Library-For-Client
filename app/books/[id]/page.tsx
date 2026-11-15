"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useTitle } from "@/lib/use-title";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Book } from "@/lib/types";

function BookDetails() {
  const params = useParams();
  const id = String(params.id);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  useTitle(book ? book.title : "Book Details");

const loadBook = useCallback(async () => {
  try {
    const data = await apiFetch(`/books/${id}`);
    setBook(data);
  } catch {
    setBook(null);
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  let ignore = false;
  apiFetch(`/books/${id}`)
    .then((data) => {
      if (!ignore) setBook(data);
    })
    .catch(() => {
      if (!ignore) setBook(null);
    })
    .finally(() => {
      if (!ignore) setLoading(false);
    });
  return () => {
    ignore = true;
  };
}, [id]);

  async function handleBorrow(e: React.FormEvent) {
    e.preventDefault();
    setBorrowing(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({
          bookId: id,
          userName: user?.name,
          userEmail: user?.email,
        }),
      });
      toast.success("বইটি সফলভাবে ধার নেওয়া হয়েছে!");
      setOpen(false);
      await loadBook();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ধার নেওয়া যায়নি");
    } finally {
      setBorrowing(false);
    }
  }

  if (loading) return <Spinner />;

  if (!book) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        বইটি পাওয়া যায়নি।
      </p>
    );
  }

  const available = book.availableCopies > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="h-[420px] overflow-hidden rounded-xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <Badge variant="secondary">{book.category}</Badge>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-muted-foreground">by {book.author}</p>
          <p>{book.description}</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Added by: <span className="font-medium">{book.userName}</span> (
              {book.userEmail})
            </p>
            <p>
              Available copies:{" "}
              <span className="font-medium">
                {book.availableCopies} / {book.totalCopies}
              </span>
            </p>
          </div>

          <Button
            size="lg"
            disabled={!available}
            onClick={() => setOpen(true)}
          >
            {available ? "Borrow This Book" : "Not Available"}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow: {book.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBorrow} className="space-y-4">
            <div className="space-y-2">
              <Label>Your Name</Label>
              <Input value={user?.name ?? ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Your Email</Label>
              <Input value={user?.email ?? ""} readOnly />
            </div>
            <Button type="submit" className="w-full" disabled={borrowing}>
              {borrowing ? "Processing..." : "Confirm Borrow"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BookDetails />
    </Suspense>
  );
}
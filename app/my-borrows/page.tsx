"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useTitle } from "@/lib/use-title";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Borrow } from "@/lib/types";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyBorrowsPage() {
  useTitle("My Borrows");
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;
    let ignore = false;

    apiFetch(`/borrows?email=${encodeURIComponent(email)}`)
      .then((data) => {
        if (!ignore) setBorrows(data);
      })
      .catch(() => {
        if (!ignore) setBorrows([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [email]);

  async function handleReturn(id: string) {
    setReturningId(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" });
      setBorrows((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, returned: true, returnedAt: new Date().toISOString() }
            : b
        )
      );
      toast.success("বইটি ফেরত দেওয়া হয়েছে। এটি এখন তোমার পড়া বইয়ের তালিকায়!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ফেরত দেওয়া যায়নি");
    } finally {
      setReturningId(null);
    }
  }

  if (isPending || loading) return <Spinner />;

  const current = borrows.filter((b) => !b.returned);
  const finished = borrows.filter((b) => b.returned);

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
      {/* এখন যে বইগুলো ধার নেওয়া আছে */}
      <section>
        <h1 className="mb-6 text-center text-3xl font-bold">My Borrows</h1>

        {current.length === 0 ? (
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              এখন তোমার কাছে কোনো ধার নেওয়া বই নেই।
            </p>
            <Button render={<Link href="/books" />}>Browse Books</Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {current.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.bookImage}
                        alt={b.bookTitle}
                        className="h-16 w-12 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{b.bookTitle}</TableCell>
                    <TableCell>{formatDate(b.borrowDate)}</TableCell>
                    <TableCell>{formatDate(b.returnDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => handleReturn(b._id)}
                        disabled={returningId === b._id}
                      >
                        {returningId === b._id ? "Returning..." : "Return Book"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      {/* পড়া শেষ করা বই */}
      <section>
        <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          Books I&apos;ve Read
        </h2>

        {finished.length === 0 ? (
          <p className="text-center text-muted-foreground">
            বই ফেরত দিলে এখানে &quot;পড়া হয়েছে&quot; হিসেবে জমা হবে।
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finished.map((b) => (
              <div
                key={b._id}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.bookImage}
                  alt={b.bookTitle}
                  className="h-20 w-14 rounded object-cover"
                />
                <div className="min-w-0 space-y-1">
                  <p className="line-clamp-1 font-medium">{b.bookTitle}</p>
                  <Badge variant="secondary">Read</Badge>
                  {b.returnedAt && (
                    <p className="text-xs text-muted-foreground">
                      Returned {formatDate(b.returnedAt)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
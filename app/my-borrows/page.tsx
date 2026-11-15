"use client";

import {  useEffect, useState } from "react"; //useCallback,
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useTitle } from "@/lib/use-title";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
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
      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("বইটি সফলভাবে ফেরত দেওয়া হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ফেরত দেওয়া যায়নি");
    } finally {
      setReturningId(null);
    }
  }

  if (isPending || loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">My Borrows</h1>

      {borrows.length === 0 ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">তুমি এখনো কোনো বই ধার নাওনি।</p>
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
              {borrows.map((b) => (
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
    </div>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookCard } from "@/components/book-card";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/types";

export function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">New Arrivals</h2>

      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="text-center text-muted-foreground">
          এখনো কোনো বই যোগ করা হয়নি।
        </p>
      ) : (
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button size="lg" render={<Link href="/books" />}>
          See All Books
        </Button>
      </div>
    </section>
  );
}
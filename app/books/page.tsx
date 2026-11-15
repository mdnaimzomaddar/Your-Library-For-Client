"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { Spinner } from "@/components/spinner";
import { useTitle } from "@/lib/use-title";
import type { Book } from "@/lib/types";

function BooksList() {
  useTitle("All Books");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const shown = category ? books.filter((b) => b.category === category) : books;

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">
        {category ? `${category} Books` : "All Books"}
      </h1>
      {shown.length === 0 ? (
        <p className="text-center text-muted-foreground">
          কোনো বই পাওয়া যায়নি।
        </p>
      ) : (
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BooksList />
    </Suspense>
  );
}
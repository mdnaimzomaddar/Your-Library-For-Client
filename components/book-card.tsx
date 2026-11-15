import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition hover:shadow-md">
      <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Badge variant="secondary" className="w-fit">
          {book.category}
        </Badge>
        <h3 className="line-clamp-1 font-semibold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          by {book.author}
        </p>
        <Button
          size="sm"
          className="mt-auto w-full"
          render={<Link href={`/books/${book._id}`} />}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
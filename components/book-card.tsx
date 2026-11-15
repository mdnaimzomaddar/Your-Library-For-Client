import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Book } from "@/lib/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="h-64 w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="flex-1 space-y-2 pt-4">
        <Badge variant="secondary">{book.category}</Badge>
        <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          by {book.author}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" render={<Link href={`/books/${book._id}`} />}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
import Link from "next/link";
import { BookOpen, Home, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Your Library | Page Not Found",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16">
      {/* পেছনের বড় ঝাপসা 404 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none text-[12rem] font-black leading-none text-primary/5 sm:text-[20rem]"
      >
        404
      </span>

      <div className="relative z-10 flex max-w-md flex-col items-center gap-5 text-center">
        {/* বইয়ের আইকন */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
          <BookOpen className="h-12 w-12 text-primary" strokeWidth={1.5} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>

        <h1 className="text-3xl font-bold sm:text-4xl">
          পাতাটি খুঁজে পাওয়া যাচ্ছে না
        </h1>

        <p className="text-muted-foreground">
          তুমি যে পাতাটি খুঁজছ সেটি হয়তো সরানো হয়েছে, মুছে গেছে, অথবা লিংকটি
          ভুল। চলো, আবার বইয়ের জগতে ফিরে যাই।
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button render={<Link href="/" />}>
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button variant="outline" render={<Link href="/books" />}>
            <Library className="mr-2 h-4 w-4" />
            Browse Books
          </Button>
        </div>
      </div>
    </div>
  );
}
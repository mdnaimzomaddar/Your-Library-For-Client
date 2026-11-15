import { BookPlus, Search, BookCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Book",
    text: "Browse the library and open any book to see its details.",
  },
  {
    icon: BookPlus,
    title: "Borrow It",
    text: "Log in, confirm your borrow and keep the book for seven days.",
  },
  {
    icon: BookCheck,
    title: "Return It",
    text: "Finished reading? Return it from your My Borrows page.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/40 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          How Borrowing Works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex h-full flex-col items-center rounded-xl border bg-background p-6 text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
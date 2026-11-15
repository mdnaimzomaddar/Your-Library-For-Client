import Link from "next/link";
import {
  Atom,
  BookOpen,
  Landmark,
  Baby,
  Shapes,
  Cpu,
  UserRound,
  Heart,
} from "lucide-react";

const categories = [
  { name: "Fiction", icon: BookOpen },
  { name: "Science", icon: Atom },
  { name: "History", icon: Landmark },
  { name: "Kids", icon: Baby },
  { name: "Technology", icon: Cpu },
  { name: "Biography", icon: UserRound },
  { name: "Romance", icon: Heart },
  { name: "Others", icon: Shapes },
];


export function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">Top Categories</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/books?category=${cat.name}`}
            className="flex h-full flex-col items-center gap-3 rounded-xl border p-6 transition hover:border-primary hover:bg-primary/5"
          >
            <cat.icon className="h-8 w-8 text-primary" />
            <span className="font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
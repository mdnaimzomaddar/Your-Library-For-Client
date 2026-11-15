"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTitle } from "@/lib/use-title";
export default function ProfilePage() {
  useTitle("My Profile");
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="mx-auto flex max-w-md justify-center px-4 py-10">
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
            <AvatarFallback className="text-3xl">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
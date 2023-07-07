import { auth } from "@/lib/firebase/client";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-semibold">
        Greeting, {auth.currentUser?.displayName}
      </h1>
    </main>
  );
}

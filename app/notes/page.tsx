import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", 1, ""],
      queryFn: () => fetchNotes(1, ""),
    });
  } catch (error) {
    console.error("Prefetch error:", error);
    // Продовжуємо рендеринг навіть якщо prefetch не вдався
    // Клієнт спробує завантажити дані самостійно
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

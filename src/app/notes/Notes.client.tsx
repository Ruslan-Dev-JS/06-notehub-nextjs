"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/src/app/components/NoteList/NoteList";
import SearchBox from "@/src/app/components/SearchBox/SearchBox";
import Modal from "@/src/app/components/Modal/Modal";
import NoteForm from "@/src/app/components/NoteForm/NoteForm";
import Pagination from "@/src/app/components/Pagination/Pagination";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  
  if (error) {
    console.error("Error fetching notes:", error);
    return (
      <div>
        <p>Something went wrong.</p>
        <p style={{ fontSize: "12px", color: "red" }}>
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
  
  if (!data) return <p>No data received.</p>;

  const { notes, totalPages } = data;
  
  if (!notes || !Array.isArray(notes)) {
    console.error("Invalid data structure:", data);
    return <p>Invalid data format received.</p>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Скидаємо на першу сторінку при пошуку
  };

  return (
    <div>
      <div style={{ marginBottom: "24px", display: "flex", gap: "16px", alignItems: "center" }}>
        <SearchBox onSearch={handleSearch} />
        <button onClick={() => setIsModalOpen(true)}>Create Note</button>
      </div>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <>
          <NoteList notes={notes} />
          
          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

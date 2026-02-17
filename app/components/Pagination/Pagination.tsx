"use client";

import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(pageCount, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const visiblePages = pages.slice(startPage - 1, endPage);

  return (
    <div className={css.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.button}
      >
        ←
      </button>
      
      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={css.button}>1</button>
          {startPage > 2 && <span className={css.ellipsis}>...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${css.button} ${currentPage === page ? css.active : ''}`}
        >
          {page}
        </button>
      ))}

      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && <span className={css.ellipsis}>...</span>}
          <button onClick={() => onPageChange(pageCount)} className={css.button}>
            {pageCount}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className={css.button}
      >
        →
      </button>
    </div>
  );
}

// Pagination.jsx (baru, di components/_shared/)
"use client"

import { Button } from "@/components/ui/button"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-end items-center gap-4 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}

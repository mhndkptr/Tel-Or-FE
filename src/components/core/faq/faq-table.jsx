import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FaqTable({ faqs, isLoading, getCategoryColor, categoriesObj, onEdit, onDelete }) {
  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }
  if (!faqs.length) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              Tidak ada FAQ yang ditemukan
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">ID</TableHead>
          <TableHead>Pertanyaan</TableHead>
          <TableHead className="hidden md:table-cell">Jawaban</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead className="w-24">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {faqs.map((faq) => (
          <TableRow key={faq.id}>
            <TableCell className="font-medium">{faq.id}</TableCell>
            <TableCell className="max-w-xs">
              <div className="truncate" title={faq.question}>{faq.question}</div>
            </TableCell>
            <TableCell className="hidden md:table-cell max-w-md">
              <div className="truncate" title={faq.answer}>{faq.answer}</div>
            </TableCell>
            <TableCell>
              <Badge className={getCategoryColor(faq.category)}>
                {categoriesObj[faq.category] || faq.category}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(faq)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus FAQ</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus FAQ ini? Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(faq.id)}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
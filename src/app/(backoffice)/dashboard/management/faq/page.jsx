"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      pertanyaan: "Bagaimana cara mendaftar akun baru?",
      jawaban:
        "Untuk mendaftar akun baru, klik tombol 'Daftar' di halaman utama, isi formulir dengan data yang diperlukan, dan verifikasi email Anda.",
      category: "Akun",
    },
    {
      id: 2,
      pertanyaan: "Bagaimana cara reset password?",
      jawaban:
        "Klik 'Lupa Password' di halaman login, masukkan email Anda, dan ikuti instruksi yang dikirim ke email.",
      category: "Akun",
    },
    {
      id: 3,
      pertanyaan: "Apakah ada biaya untuk menggunakan layanan ini?",
      jawaban:
        "Kami menyediakan paket gratis dengan fitur terbatas dan paket premium dengan fitur lengkap. Lihat halaman pricing untuk detail.",
      category: "Pembayaran",
    },
    {
      id: 4,
      pertanyaan: "Bagaimana cara menghubungi customer support?",
      jawaban:
        "Anda dapat menghubungi kami melalui email support@example.com atau chat langsung di website.",
      category: "Dukungan",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    pertanyaan: "",
    jawaban: "",
    category: "",
  });

  const categories = ["Akun", "Pembayaran", "Dukungan", "Teknis", "Umum"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.jawaban.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingFaq.id ? { ...faq, ...formData } : faq
        )
      );
    } else {
      const newFaq = {
        id: Math.max(...faqs.map((f) => f.id)) + 1,
        ...formData,
      };
      setFaqs([...faqs, newFaq]);
    }
    resetForm();
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      pertanyaan: faq.pertanyaan,
      jawaban: faq.jawaban,
      category: faq.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const resetForm = () => {
    setFormData({ pertanyaan: "", jawaban: "", category: "" });
    setEditingFaq(null);
    setIsDialogOpen(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Akun: "bg-blue-100 text-blue-800",
      Pembayaran: "bg-green-100 text-green-800",
      Dukungan: "bg-purple-100 text-purple-800",
      Teknis: "bg-orange-100 text-orange-800",
      Umum: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">FAQ Management</h1>
            <p className="text-muted-foreground">
              Kelola pertanyaan yang sering diajukan
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingFaq ? "Edit FAQ" : "Tambah FAQ Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingFaq
                    ? "Edit informasi FAQ yang sudah ada"
                    : "Tambahkan pertanyaan dan jawaban baru"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pertanyaan">Pertanyaan</Label>
                  <Input
                    id="pertanyaan"
                    value={formData.pertanyaan}
                    onChange={(e) =>
                      setFormData({ ...formData, pertanyaan: e.target.value })
                    }
                    placeholder="Masukkan pertanyaan..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jawaban">Jawaban</Label>
                  <Textarea
                    id="jawaban"
                    value={formData.jawaban}
                    onChange={(e) =>
                      setFormData({ ...formData, jawaban: e.target.value })
                    }
                    placeholder="Masukkan jawaban..."
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingFaq ? "Update" : "Simpan"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter & Pencarian</CardTitle>
            <CardDescription>
              Cari dan filter FAQ berdasarkan kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari pertanyaan atau jawaban..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar FAQ ({filteredFaqs.length})</CardTitle>
            <CardDescription>
              Kelola semua pertanyaan yang sering diajukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Jawaban
                    </TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="w-24">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaqs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        Tidak ada FAQ yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFaqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium">{faq.id}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={faq.pertanyaan}>
                            {faq.pertanyaan}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-md">
                          <div className="truncate" title={faq.jawaban}>
                            {faq.jawaban}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(faq.category)}>
                            {faq.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(faq)}
                            >
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
                                    Apakah Anda yakin ingin menghapus FAQ ini?
                                    Tindakan ini tidak dapat dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(faq.id)}
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

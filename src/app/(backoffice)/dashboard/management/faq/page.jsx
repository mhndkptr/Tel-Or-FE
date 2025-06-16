"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import {
  useGetAllFaq,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} from "@/hooks/faq.hooks";
import FaqForm from "@/components/core/faq/faq-form";
import FaqTable from "@/components/core/faq/faq-table";

export default function FAQManagement() {
  const categoriesObj = {
    umum: "Umum",
    bantuan: "Bantuan",
    informasi: "Informasi",
    event: "Event",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const { faqs, isLoading, refetch } = useGetAllFaq();

  const { addFaqMutation } = useAddFaqMutation({
    successAction: () => {
      refetch();
      resetForm();
    },
  });

  const { editFaqMutation } = useEditFaqMutation({
    successAction: () => {
      refetch();
      resetForm();
    },
  });

  const { deleteFaqMutation } = useDeleteFaqMutation({
    successAction: () => {
      refetch();
    },
  });

  const filteredFaqs = (faqs || []).filter((faq) => {
    return (
      (searchTerm === "" ||
        faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || faq.category === selectedCategory)
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingFaq) {
      editFaqMutation.mutate({
        faqId: editingFaq.id,
        payload: {
          question: formData.question,
          answer: formData.answer,
          category: formData.category,
        },
      });
    } else {
      addFaqMutation.mutate({
        payload: {
          question: formData.question,
          answer: formData.answer,
          category: formData.category,
        },
      });
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteFaqMutation.mutate({ faqId: id });
  };

  const resetForm = () => {
    setFormData({ question: "", answer: "", category: "" });
    setEditingFaq(null);
    setIsDialogOpen(false);
  };

  const getCategoryColor = (categoryKey) => {
    const label = categoriesObj[categoryKey];
    const colors = {
      Umum: "bg-blue-100 text-blue-800",
      Informasi: "bg-green-100 text-green-800",
      Event: "bg-purple-100 text-purple-800",
      Bantuan: "bg-orange-100 text-orange-800",
    };
    return colors[label] || "bg-gray-100 text-gray-800";
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
              <FaqForm
                formData={formData}
                setFormData={setFormData}
                categoriesObj={categoriesObj}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                isPending={
                  addFaqMutation.isPending || editFaqMutation.isPending
                }
                editingFaq={editingFaq}
              />
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
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {Object.entries(categoriesObj).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
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
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <FaqTable
                  faqs={filteredFaqs}
                  isLoading={isLoading}
                  getCategoryColor={getCategoryColor}
                  categoriesObj={categoriesObj}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

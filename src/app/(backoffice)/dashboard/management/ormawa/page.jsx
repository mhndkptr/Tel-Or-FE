"use client";

import { useRef, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import {
  useGetAllOrmawa,
  useAddOrmawaMutation,
  useEditOrmawaMutation,
  useDeleteOrmawaMutation,
} from "@/hooks/ormawa.hooks";
import { useAuth } from "@/contexts/authContext";
import { DashboardHeader } from "@/components/_shared/header/DashboardHeader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";

const LAB_TYPE_ENUM = ["PRAKTIKUM", "RESEARCH"];
const CATEGORIES = ["LAB", "ORGANIZATION", "UKM", "COMMUNITY"];

const CATEGORY_COLORS = {
  LAB: "bg-purple-100 text-purple-800",
  ORGANIZATION: "bg-pink-100 text-pink-800",
  UKM: "bg-green-100 text-green-800",
  COMMUNITY: "bg-blue-100 text-blue-800",
};

const LAB_TYPE_COLORS = {
  PRAKTIKUM: "bg-orange-100 text-orange-800",
  RESEARCH: "bg-yellow-100 text-yellow-800",
};

const INITIAL_FORM_DATA = {
  ormawaName: "",
  description: "",
  content: "",
  isOpenRegistration: false,
  icon: "",
  background: "",
  category: "",
  labType: "",
  ukmCategory: "",
};

export default function OrmawaManagement() {
  const { user } = useAuth();
  const { ormawaData, isLoading, refetch } = useGetAllOrmawa();
  const addOrmawaMutation = useAddOrmawaMutation({ successAction: refetch });
  const editOrmawaMutation = useEditOrmawaMutation({ successAction: refetch });
  const deleteOrmawaMutation = useDeleteOrmawaMutation({
    successAction: refetch,
  });

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrmawa, setEditingOrmawa] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [fileIcon, setFileIcon] = useState(null);
  const [fileBg, setFileBg] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [bgPreview, setBgPreview] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Refs
  const iconInputRef = useRef();
  const bgInputRef = useRef();

  // Computed values
  const filteredOrmawas = (ormawaData || []).filter((o) => {
    const matchSearch =
      o.ormawaName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "all" || o.category === selectedCategory;
    const matchCreator = user?.role === "ADMIN" || (user?.role === "ORGANIZER" && o.creatorId === user.id);
    return matchSearch && matchCategory && matchCreator;
  });

  const organizerOrmawaCount = ormawaData?.filter((o) => o.creatorId === user?.id).length || 0;
  const canCreateOrmawa = user?.role === "ADMIN" || (user?.role === "ORGANIZER" && organizerOrmawaCount === 0);

  // Utility functions
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setFileIcon(null);
    setFileBg(null);
    setIconPreview("");
    setBgPreview("");
    setEditingOrmawa(null);
    if (iconInputRef.current) iconInputRef.current.value = "";
    if (bgInputRef.current) bgInputRef.current.value = "";
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // File handling
  const handleFileChange = (file, type) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (type === "icon") {
        setFileIcon(file);
        setIconPreview(ev.target.result);
      } else {
        setFileBg(file);
        setBgPreview(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "icon" || key === "background") return;
      if (key === "isOpenRegistration") {
        payload.append(key, value ? "true" : "false");
      } else if (value) {
        payload.append(key, value);
      }
    });

    if (fileIcon instanceof File) {
      payload.append("icon", fileIcon);
    }

    if (fileBg instanceof File) {
      payload.append("background", fileBg);
    }

    payload.append("userId", user?.userId);

    if (editingOrmawa) {
      editOrmawaMutation.mutate({ id: editingOrmawa.id, payload });
    } else {
      addOrmawaMutation.mutate({ payload });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  console.log("Ormawa Data:", ormawaData);

  // CRUD operations
  const handleEdit = (ormawa) => {
    if (user?.role === "ORGANIZER" && ormawa.creatorId !== user.id) {
      console.warn("⚠️ ORGANIZER hanya bisa edit ormawa milik sendiri");
      return;
    }

    setEditingOrmawa(ormawa);
    setFormData({
      ormawaName: ormawa.ormawaName || "",
      description: ormawa.description || "",
      content: ormawa.content || "",
      isOpenRegistration: ormawa.isOpenRegistration || false,
      icon: ormawa.icon || "",
      background: ormawa.background || "",
      category: ormawa.category || "",
      labType: ormawa.labType || "",
      ukmCategory: ormawa.ukmCategory || "",
    });
    setIconPreview(ormawa.icon || "");
    setBgPreview(ormawa.background || "");
    setIsDialogOpen(true);

    if (iconInputRef.current) iconInputRef.current.value = "";
    if (bgInputRef.current) bgInputRef.current.value = "";
  };

  const handleDelete = (id) => {
    const ormawaToDelete = ormawaData.find((o) => o.id === id);
    if (user?.role === "ORGANIZER" && ormawaToDelete?.creatorId !== user.id) {
      console.warn("⚠️ ORGANIZER hanya bisa hapus ormawa milik sendiri");
      return;
    }
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteOrmawaMutation.mutate({ ormawaId: pendingDeleteId });
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="Manajemen Ormawa" />
      <main className="md:p-5 p-3 bg-[#FCFCFC] min-h-screen md:space-y-5 space-y-3">
        {/* Filter & Search Section */}
        <Card className="w-full gap-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Filter & Pencarian</CardTitle>
                <CardDescription>Cari dan filter Ormawa berdasarkan kategori</CardDescription>
              </div>
              {canCreateOrmawa && (
                <Button
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Ormawa
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama, deskripsi, atau konten..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="w-full" value="all">
                      Semua Kategori
                    </SelectItem>
                    {CATEGORIES.map((category) => (
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

        {/* Ormawa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrmawas.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              <div className="text-lg font-medium">Tidak ada data Ormawa</div>
              <div className="text-sm">Coba ubah filter atau tambah Ormawa baru</div>
            </div>
          ) : (
            filteredOrmawas.map((ormawa, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow gap-0">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{ormawa.ormawaName}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        <Badge className={CATEGORY_COLORS[ormawa.category] || "bg-gray-100 text-gray-800"}>
                          {ormawa.category}
                        </Badge>
                        {ormawa.labType && ormawa.category === "LAB" && (
                          <Badge className={LAB_TYPE_COLORS[ormawa.labType] || "bg-gray-100 text-gray-800"}>
                            {ormawa.labType}
                          </Badge>
                        )}
                        {ormawa.ukmCategory && ormawa.category === "UKM" && (
                          <Badge className="bg-blue-100 text-blue-800">{ormawa.ukmCategory}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(ormawa)} className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(ormawa.id)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700 text-sm">{ormawa.description}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <span>Pendaftaran:</span>
                      <Badge
                        variant={ormawa.isOpenRegistration ? "default" : "secondary"}
                        className={
                          ormawa.isOpenRegistration ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {ormawa.isOpenRegistration ? "Dibuka" : "Ditutup"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingOrmawa ? "Edit Ormawa" : "Tambah Ormawa"}</DialogTitle>
              <DialogDescription>
                {editingOrmawa ? "Perbarui data Ormawa" : "Masukkan data Ormawa baru"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ormawaName">Nama Ormawa *</Label>
                  <Input
                    id="ormawaName"
                    value={formData.ormawaName}
                    onChange={(e) => handleFormChange("ormawaName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi *</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleFormChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status Pendaftaran</Label>
                  <Select
                    value={formData.isOpenRegistration ? "true" : "false"}
                    onValueChange={(value) => handleFormChange("isOpenRegistration", value === "true")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Dibuka</SelectItem>
                      <SelectItem value="false">Ditutup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full gap-4">
                {formData.category === "LAB" && (
                  <div className="space-y-2 w-full">
                    <Label>Tipe Lab *</Label>
                    <Select
                      value={formData.labType}
                      onValueChange={(value) => handleFormChange("labType", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe lab" />
                      </SelectTrigger>
                      <SelectContent>
                        {LAB_TYPE_ENUM.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.category === "UKM" && (
                  <div className="space-y-2 w-full">
                    <Label>Kategori UKM</Label>
                    <Input
                      value={formData.ukmCategory}
                      onChange={(e) => handleFormChange("ukmCategory", e.target.value)}
                      placeholder="Isi kategori UKM"
                    />
                  </div>
                )}
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={iconInputRef}
                    onChange={(e) => handleFileChange(e.target.files[0], "icon")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {iconPreview && (
                    <img
                      src={
                        fileIcon
                          ? iconPreview
                          : `${process.env.NEXT_PUBLIC_API_BASE_URL}${iconPreview}` || "/placeholder.svg"
                      }
                      alt="Preview Icon"
                      className="mt-2 w-16 h-16 object-contain border rounded"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Background</Label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={bgInputRef}
                    onChange={(e) => handleFileChange(e.target.files[0], "background")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {bgPreview && (
                    <img
                      src={
                        fileBg ? bgPreview : `${process.env.NEXT_PUBLIC_API_BASE_URL}${bgPreview}` || "/placeholder.svg"
                      }
                      alt="Preview Background"
                      className="mt-2 w-16 h-16 object-contain border rounded"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Konten *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleFormChange("content", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose} className="cursor-pointer">
                  Batal
                </Button>
                <Button variant={"default"} type="submit" className="cursor-pointer">
                  {editingOrmawa ? "Update" : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Ormawa</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus data Ormawa ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  );
}

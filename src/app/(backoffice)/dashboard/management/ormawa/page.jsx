"use client";

import { useRef, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import {
  useGetAllOrmawa,
  useAddOrmawaMutation,
  useEditOrmawaMutation,
  useDeleteOrmawaMutation,
} from "@/hooks/ormawa.hooks";
import { useAuth } from "@/contexts/authContext"; // Tambahkan untuk akses user

// UI Components (sama seperti sebelumnya)
function Input(props) {
  return <input className="border rounded px-2 py-1 w-full" {...props} />;
}
function Textarea(props) {
  return <textarea className="border rounded px-2 py-1 w-full" {...props} />;
}
function Button({ children, variant, className = "", ...props }) {
  const style =
    variant === "outline"
      ? "border px-3 py-1 rounded hover:bg-gray-100"
      : "bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark";
  return (
    <button className={style + " " + className} {...props}>
      {children}
    </button>
  );
}
function Label({ children }) {
  return <label className="block mb-1 font-medium">{children}</label>;
}
function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
function Select({ value, onValueChange, children, ...props }) {
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      {...props}
    >
      {children}
    </select>
  );
}
function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
function Card({ children }) {
  return <div className="bg-white rounded shadow border">{children}</div>;
}
function CardHeader({ children }) {
  return <div className="p-4 border-b">{children}</div>;
}
function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}
function CardDescription({ children }) {
  return <p className="text-gray-500">{children}</p>;
}
function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded shadow-lg p-6 min-w-[350px]">
        {children}
      </div>
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        style={{ zIndex: -1 }}
      />
    </div>
  );
}
function DialogTrigger({ asChild, children, onClick }) {
  return (
    <span onClick={onClick} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
function DialogContent({ children }) {
  return <div>{children}</div>;
}
function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}
function DialogDescription({ children }) {
  return <p className="text-gray-500">{children}</p>;
}
function DialogFooter({ children }) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
}
function AlertDialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded shadow-lg p-6 min-w-[350px]">
        {children}
      </div>
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        style={{ zIndex: -1 }}
      />
    </div>
  );
}
function AlertDialogContent({ children }) {
  return <div>{children}</div>;
}
function AlertDialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}
function AlertDialogDescription({ children }) {
  return <p className="text-gray-500">{children}</p>;
}
function AlertDialogFooter({ children }) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
}
function AlertDialogCancel({ children, onClick }) {
  return (
    <Button variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
}
function AlertDialogAction({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

const LAB_TYPE_ENUM = ["PRAKTIKUM", "RESEARCH"];
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

export default function OrmawaManagement() {
  const { user } = useAuth(); // Ambil data user termasuk role dan id
  const { ormawaData, isLoading, refetch } = useGetAllOrmawa();
  const addOrmawaMutation = useAddOrmawaMutation({ successAction: refetch });
  const editOrmawaMutation = useEditOrmawaMutation({ successAction: refetch });
  const deleteOrmawaMutation = useDeleteOrmawaMutation({
    successAction: refetch,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrmawa, setEditingOrmawa] = useState(null);
  const [formData, setFormData] = useState({
    ormawaName: "",
    description: "",
    content: "",
    isOpenRegistration: false,
    icon: "",
    background: "",
    category: "",
    labType: "",
    ukmCategory: "",
  });
  const [fileIcon, setFileIcon] = useState(null);
  const [fileBg, setFileBg] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [bgPreview, setBgPreview] = useState("");
  const iconInputRef = useRef();
  const bgInputRef = useRef();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const categories = ["LAB", "ORGANIZATION", "UKM", "COMMUNITY"];

  // Filter ormawa berdasarkan role
  const filteredOrmawas = (ormawaData || []).filter((o) => {
    const matchSearch =
      o.ormawaName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || o.category === selectedCategory;
    const matchCreator =
      user?.role === "ADMIN" || (user?.role === "ORGANIZER" && o.creatorId === user.id);
    return matchSearch && matchCategory && matchCreator;
  });

  // Cek apakah ORGANIZER sudah memiliki ormawa
  const organizerOrmawaCount = ormawaData?.filter((o) => o.creatorId === user?.id).length || 0;

  const resetForm = () => {
    setFormData({
      ormawaName: "",
      description: "",
      content: "",
      isOpenRegistration: false,
      icon: "",
      background: "",
      category: "",
      labType: "",
      ukmCategory: "",
    });
    setFileIcon(null);
    setFileBg(null);
    setIconPreview("");
    setBgPreview("");
    setEditingOrmawa(null);
    if (iconInputRef.current) iconInputRef.current.value = "";
    if (bgInputRef.current) bgInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("ormawaName", formData.ormawaName || "");
    payload.append("description", formData.description || "");
    payload.append("content", formData.content || "");
    payload.append(
      "isOpenRegistration",
      formData.isOpenRegistration ? "true" : "false"
    );
    payload.append("category", formData.category || "");

    if (formData.category === "LAB" && formData.labType) {
      payload.append("labType", formData.labType || "");
    }

    if (formData.category === "UKM" && formData.ukmCategory) {
      payload.append("ukmCategory", formData.ukmCategory || "");
    }

    if (fileIcon instanceof File) {
      payload.append("icon", fileIcon);
    }

    if (fileBg instanceof File) {
      payload.append("background", fileBg);
    }

    payload.append("creatorId", user?.id); // Tambahkan creatorId ke payload
    console.log("Submitting payload:", payload);
    if (editingOrmawa) {
      editOrmawaMutation.mutate({ id: editingOrmawa.id, payload });
    } else {
      addOrmawaMutation.mutate({ payload });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (o) => {
    if (user?.role === "ORGANIZER" && o.creatorId !== user.id) {
      console.warn("⚠️ ORGANIZER hanya bisa edit ormawa milik sendiri");
      return;
    }
    setEditingOrmawa(o);
    setFormData({
      ormawaName: o.ormawaName || "",
      description: o.description || "",
      content: o.content || "",
      isOpenRegistration: o.isOpenRegistration || false,
      icon: o.icon || "",
      background: o.background || "",
      category: o.category || "",
      labType: o.labType || "",
      ukmCategory: o.ukmCategory || "",
    });
    setIconPreview(o.icon || "");
    setBgPreview(o.background || "");
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

  const showLabType = formData.category === "LAB";
  const showUkmCategory = formData.category === "UKM";

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileIcon(file);
      const reader = new FileReader();
      reader.onload = (ev) => setIconPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileBg(file);
      const reader = new FileReader();
      reader.onload = (ev) => setBgPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Ormawa Management</h1>
            <p className="text-gray-500">Kelola data Ormawa</p>
          </div>
          {user?.role !== "ADMIN" && user?.role === "ORGANIZER" && organizerOrmawaCount === 0 && (
            <DialogTrigger
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Button className="flex flex-col items-center bg-blue-600 hover:bg-blue-700">
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-sm font-semibold">Tambah Ormawa</span>
              </Button>
            </DialogTrigger>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingOrmawa ? "Edit Ormawa" : "Tambah Ormawa"}
                </DialogTitle>
                <DialogDescription>
                  {editingOrmawa
                    ? "Perbarui data Ormawa"
                    : "Masukkan data Ormawa baru"}
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-0" onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label>Nama Ormawa</Label>
                    <Input
                      value={formData.ormawaName}
                      onChange={(e) =>
                        setFormData({ ...formData, ormawaName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label>Deskripsi</Label>
                    <Input
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label>Icon</Label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={iconInputRef}
                      onChange={handleIconChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                    {iconPreview && (
                      <img
                        src={iconPreview}
                        alt="Preview Icon"
                        className="mt-2 w-12 h-12 object-contain border rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label>Background</Label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={bgInputRef}
                      onChange={handleBgChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                    {bgPreview && (
                      <img
                        src={bgPreview}
                        alt="Preview Background"
                        className="mt-2 w-12 h-12 object-contain border rounded"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label>Kategori</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) =>
                        setFormData({
                          ...formData,
                          category: v,
                          labType: "",
                          ukmCategory: "",
                        })
                      }
                      required
                    >
                      <SelectItem value="">Pilih kategori</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  {showLabType && (
                    <div className="flex-1 min-w-[200px]">
                      <Label>Lab Type</Label>
                      <Select
                        value={formData.labType}
                        onValueChange={(v) =>
                          setFormData({ ...formData, labType: v })
                        }
                        required
                      >
                        <SelectItem value="">Pilih tipe lab</SelectItem>
                        {LAB_TYPE_ENUM.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}
                  {showUkmCategory && (
                    <div className="flex-1 min-w-[200px]">
                      <Label>UKM Category</Label>
                      <Input
                        value={formData.ukmCategory}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ukmCategory: e.target.value,
                          })
                        }
                        placeholder="Isi kategori UKM jika ada"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px]">
                    <Label>Buka Pendaftaran</Label>
                    <Select
                      value={formData.isOpenRegistration ? "true" : "false"}
                      onValueChange={(v) =>
                        setFormData({
                          ...formData,
                          isOpenRegistration: v === "true",
                        })
                      }
                    >
                      <SelectItem value="true">Dibuka</SelectItem>
                      <SelectItem value="false">Ditutup</SelectItem>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Konten</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingOrmawa ? "Update" : "Simpan"}
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
              Cari dan filter Ormawa berdasarkan kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama, deskripsi, atau konten..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: 32 }}
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrmawas.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">
              Tidak ada data Ormawa
            </div>
          )}
          {filteredOrmawas.map((o) => (
            <Card key={o.id}>
              <div className="flex justify-between items-start p-4 border-b">
                <div>
                  <div className="font-bold text-lg">{o.ormawaName}</div>
                  <Badge
                    className={
                      CATEGORY_COLORS[o.category] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {o.category}
                  </Badge>
                  {o.labType && o.category === "LAB" && (
                    <span className="ml-2">
                      <Badge
                        className={
                          LAB_TYPE_COLORS[o.labType] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {o.labType}
                      </Badge>
                    </span>
                  )}
                  {o.ukmCategory && o.category === "UKM" && (
                    <span className="ml-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {o.ukmCategory}
                      </Badge>
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(o)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(o.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent>
                <div className="mb-2 text-gray-700">{o.description}</div>
                <div className="mb-2 text-sm text-gray-500 whitespace-pre-line">
                  {o.content}
                </div>
                <div className="mb-2 text-xs flex items-center gap-2">
                  <span className="font-semibold">Icon:</span>
                  {o.icon ? (
                    <img
                      src={o.icon}
                      alt="icon"
                      className="w-8 h-8 object-contain border rounded"
                    />
                  ) : (
                    <span className="italic text-gray-400">Tidak ada icon</span>
                  )}
                </div>
                <div className="mb-2 text-xs flex items-center gap-2">
                  <span className="font-semibold">Background:</span>
                  {o.background ? (
                    <img
                      src={o.background}
                      alt="background"
                      className="w-8 h-8 object-contain border rounded"
                    />
                  ) : (
                    <span className="italic text-gray-400">
                      Tidak ada background
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span>Pendaftaran:</span>
                  <span
                    className={
                      o.isOpenRegistration ? "text-green-600" : "text-red-600"
                    }
                  >
                    {o.isOpenRegistration ? "Dibuka" : "Ditutup"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AlertDialog untuk hapus */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Ormawa</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data Ormawa ini? Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
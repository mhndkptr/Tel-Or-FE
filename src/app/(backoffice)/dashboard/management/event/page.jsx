"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import ToastContent from "@/components/_shared/toast/ToastContent";
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
import { Plus, Search, Filter } from "lucide-react";

import EventForm from "@/components/core/event/event-form";
import EventTable from "@/components/core/event/event-table";
import { useGetAllOrmawa } from "@/hooks/ormawa.hooks";

import {
  useGetAllEvent,
  useAddEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
} from "@/hooks/event.hooks";
import { useAuth } from "@/contexts/authContext";

export default function EventManagement() {
  const { user } = useAuth();

  const eventTypesObj = {
    SEMINAR: "Seminar",
    LOMBA: "Lomba",
    BEASISWA: "Beasiswa",
    COMPANY_VISIT: "Company Visit", // <-- pakai underscore
    OPEN_RECRUITMENT: "Open Recruitment", // <-- pakai underscore
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const { eventsData, isLoading, refetch } = useGetAllEvent();
  const { addEventMutation } = useAddEventMutation({
    successAction: () => {
      refetch();
      setIsDialogOpen(false);
    },
  });
  const { editEventMutation } = useEditEventMutation({
    successAction: () => {
      refetch();
      setIsDialogOpen(false);
    },
  });
  const { deleteEventMutation } = useDeleteEventMutation({
    successAction: () => refetch(),
  });

  const toIsoUtc = (dateStr) => {
    if (!dateStr) return "";
    // Jika sudah ISO, return apa adanya
    if (dateStr.includes("T") && dateStr.endsWith("Z")) return dateStr;
    // Jika hanya tanggal, tambahkan waktu dan konversi ke UTC
    const date = new Date(dateStr);
    return date.toISOString(); // hasil: 2025-06-18T00:00:00.000Z
  };

  const handleSubmit = (data) => {
    if (
      !data.ormawaId ||
      data.ormawaId === "undefined" ||
      data.ormawaId === ""
    ) {
      alert("Ormawa ID tidak valid. Pilih Ormawa dengan benar.");
      return;
    }
    const payload = new FormData();
    payload.append("eventName", data.eventName);
    if (!editingEvent) {
      payload.append("eventType", data.eventType.toUpperCase());
    }
    payload.append("eventRegion", data.eventRegion || "");
    payload.append("description", data.description || "");
    payload.append("startEvent", toIsoUtc(data.startEvent));
    payload.append("endEvent", toIsoUtc(data.endEvent) || "");
    payload.append("prize", data.prize || "");
    payload.append("content", data.content || "");
    if (data.photoFile) {
      payload.append("image", data.photoFile);
    }
    payload.append("ormawaId", String(data.ormawaId));
    console.log("👉 Payload entries:", [...payload.entries()]);
    if (editingEvent) {
      payload.append("eventId", editingEvent.eventId);
      editEventMutation.mutate({ payload });
    } else {
      addEventMutation.mutate({ payload });
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="font-bold mb-2">Konfirmasi Hapus</div>
          <div className="mb-3">Yakin ingin menghapus event ini?</div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => {
                deleteEventMutation.mutate({ eventId: id });
                closeToast();
              }}
            >
              Ya, hapus
            </button>
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={closeToast}
            >
              Batal
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
      }
    );
  };

  const resetForm = () => {
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const getEventTypeColor = (eventTypeKey) => {
    const label = eventTypesObj[eventTypeKey];
    const colors = {
      Seminar: "bg-blue-100 text-blue-800",
      Lomba: "bg-red-100 text-red-800",
      Beasiswa: "bg-green-100 text-green-800",
      "Company Visit": "bg-purple-100 text-purple-800",
      "Open Recruitment": "bg-orange-100 text-orange-800",
    };
    return colors[label] || "bg-gray-100 text-gray-800";
  };

  const filteredEvents = (eventsData || []).filter((event) => {
    const eventTypeMatch =
      selectedEventType === "all" ||
      (event.eventType || "").toUpperCase() === selectedEventType.toUpperCase();

    const searchMatch =
      searchTerm === "" ||
      event.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const ormawaMatch =
      !user?.role === "ORGANIZER" ||
      (user?.role === "ORGANIZER" &&
        user.ormawaId &&
        event.ormawaId === user.ormawaId);

    return eventTypeMatch && searchMatch && ormawaMatch;
  });

  const { ormawaData, isLoading: isLoadingOrmawa } = useGetAllOrmawa();

  if (
    user?.role === "ORGANIZER" &&
    (!user.ormawaId || user.ormawaId === "undefined")
  ) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 border border-red-300 rounded-lg shadow-md p-6">
          <p className="text-center text-red-700 font-semibold text-lg bg-white px-4 py-2 rounded-md">
            Anda belum memiliki ormawa. <br />
            Silakan buat ormawa terlebih dahulu untuk mengelola event.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-muted-foreground">
              Kelola semua event dan kegiatan
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setEditingEvent(null)}
                disabled={
                  user?.role === "ORGANIZER" &&
                  (!user.ormawaId || user.ormawaId === "undefined")
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? "Edit Event" : "Tambah Event Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingEvent
                    ? "Edit informasi event yang sudah ada"
                    : "Tambahkan event dan kegiatan baru"}
                </DialogDescription>
              </DialogHeader>
              <EventForm
                formData={editingEvent}
                eventTypesObj={eventTypesObj}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                isPending={
                  addEventMutation.isPending || editEventMutation.isPending
                }
                editingEvent={editingEvent}
                user={user}
                ormawaList={ormawaData}
                isLoadingOrmawa={isLoadingOrmawa}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter & Pencarian</CardTitle>
            <CardDescription>
              Cari dan filter event berdasarkan tipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama event atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="sm:w-48">
                <Select
                  value={selectedEventType}
                  onValueChange={setSelectedEventType}
                >
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Pilih tipe event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    {Object.entries(eventTypesObj).map(([key, label]) => (
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
            <CardTitle>Daftar Event ({filteredEvents.length})</CardTitle>
            <CardDescription>Kelola semua event dan kegiatan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <EventTable
                events={filteredEvents}
                isLoading={isLoading}
                getEventTypeColor={getEventTypeColor}
                eventTypesObj={eventTypesObj}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

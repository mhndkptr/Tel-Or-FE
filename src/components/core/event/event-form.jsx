"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { ROLE } from "@/utils/constants";

export default function EventForm({
  formData,
  eventTypesObj,
  onSubmit,
  onCancel,
  isPending,
  editingEvent,
  user,
  ormawaList = [],
  isLoadingOrmawa = false,
}) {
  const [localFormData, setLocalFormData] = useState({
    eventName: "",
    eventType: "",
    eventRegion: "",
    description: "",
    startEvent: "",
    endEvent: "",
    prize: "",
    content: "",
    photoFile: null,
    ormawaId: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData({
        eventName: formData.eventName || "",
        eventType: formData.eventType || "",
        eventRegion: formData.eventRegion || "",
        description: formData.description || "",
        startEvent: formData.startEvent ? formData.startEvent.split("T")[0] : "",
        endEvent: formData.endEvent ? formData.endEvent.split("T")[0] : "",
        prize: formData.prize || "",
        content: formData.content || "",
        ormawaId: formData.ormawaId ? String(formData.ormawaId) : "",
        photoFile: null,
      });
    } else {
      setLocalFormData({
        eventName: "",
        eventType: "",
        eventRegion: "",
        description: "",
        startEvent: "",
        endEvent: "",
        prize: "",
        content: "",
        ormawaId: "",
        photoFile: null,
      });
    }
  }, [formData]);

  useEffect(() => {
    if (user?.role === "ORGANIZER" && editingEvent) {
      if (editingEvent.ormawaId !== user?.ormawa?.id) {
        console.warn(
          "⚠️ ORGANIZER mencoba mengedit event dari ormawa lain:",
          editingEvent.ormawaId,
          "Expected:",
          user?.ormawa?.id
        );
        onCancel(); // Tutup form jika ormawaId tidak sesuai
      }
    }
  }, [user, editingEvent, onCancel]);

  const handleInputChange = (field, value) => {
    // Jangan izinkan perubahan eventType saat edit
    if (editingEvent && field === "eventType") return;
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalFormData((prev) => ({
        ...prev,
        photoFile: file,
      }));
    }
  };

  // eventType diambil dari localFormData (buat baru) atau dari editingEvent (edit)
  const currentEventType = editingEvent ? editingEvent.eventType : localFormData.eventType;

  const isPrizeRequired = currentEventType === "LOMBA" || currentEventType === "BEASISWA";
  const isEventRegionRequired =
    currentEventType === "LOMBA" || currentEventType === "SEMINAR" || currentEventType === "BEASISWA";

  const isFormValid =
    !!localFormData.eventName &&
    !!currentEventType &&
    !!localFormData.startEvent &&
    (!isPrizeRequired || !!localFormData.prize) &&
    (!isEventRegionRequired || !!localFormData.eventRegion) &&
    (user?.role === ROLE.ADMIN || !!localFormData.ormawaId);

  const eventRegionOptions = [
    { value: "Regional", label: "Regional" },
    { value: "National", label: "National" },
    { value: "International", label: "International" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...localFormData,
      eventType: currentEventType,
      ormawaId: localFormData.ormawaId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dropdown Ormawa untuk Admin saat tambah event */}
      {user?.role === "ADMIN" && (
        <div className="space-y-2">
          <Label>Ormawa *</Label>
          {isLoadingOrmawa ? (
            <p>Memuat daftar ormawa...</p>
          ) : ormawaList.length === 0 ? (
            <p className="text-red-500">Tidak ada ormawa tersedia. Hubungi administrator.</p>
          ) : editingEvent ? (
            <Input
              value={ormawaList.find((o) => o.id === localFormData.ormawaId)?.ormawaName || "Tidak ditemukan"}
              disabled
              readOnly
            />
          ) : (
            <Select
              value={localFormData.ormawaId}
              onValueChange={(value) => {
                setLocalFormData((prev) => ({ ...prev, ormawaId: value }));
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih ormawa" />
              </SelectTrigger>
              <SelectContent>
                {ormawaList.map((ormawa) => (
                  <SelectItem key={ormawa.id || ormawa.ormawaName} value={String(ormawa.id)}>
                    {ormawa.ormawaName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nama Event *</Label>
          <Input
            value={localFormData.eventName}
            onChange={(e) => handleInputChange("eventName", e.target.value)}
            placeholder="Masukkan nama event"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Tipe Event *</Label>
          {/* Jika edit event, tampilkan eventType sebagai text saja */}
          {editingEvent ? (
            <Input value={eventTypesObj[editingEvent.eventType] || editingEvent.eventType} disabled readOnly />
          ) : (
            <Select
              value={localFormData.eventType}
              onValueChange={(value) => handleInputChange("eventType", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe event" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(eventTypesObj).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {isEventRegionRequired && (
        <div className="space-y-2">
          <Label>Cakupan Event *</Label>
          <Select
            value={localFormData.eventRegion}
            onValueChange={(value) => handleInputChange("eventRegion", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih cakupan event" />
            </SelectTrigger>
            <SelectContent>
              {eventRegionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          value={localFormData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Masukkan deskripsi event"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tanggal Mulai *</Label>
          <Input
            type="date"
            value={localFormData.startEvent}
            onChange={(e) => handleInputChange("startEvent", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Tanggal Selesai</Label>
          <Input
            type="date"
            value={localFormData.endEvent}
            onChange={(e) => handleInputChange("endEvent", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Hadiah/Beasiswa (Rp)
          {isPrizeRequired && " *"}
        </Label>
        <Input
          type="number"
          value={localFormData.prize}
          onChange={(e) => handleInputChange("prize", e.target.value)}
          placeholder="Masukkan nilai hadiah/beasiswa"
          required={isPrizeRequired}
        />
      </div>

      <div className="space-y-2">
        <Label>Foto Event</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="space-y-2">
        <Label>Konten Detail</Label>
        <Textarea
          value={localFormData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="Masukkan konten detail event"
          rows={8}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={!isFormValid || isPending}>
          {isPending ? "Menyimpan..." : editingEvent ? "Update Event" : "Tambah Event"}
        </Button>
      </DialogFooter>
    </form>
  );
}

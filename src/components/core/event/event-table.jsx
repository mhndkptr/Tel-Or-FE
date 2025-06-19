"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

export default function EventTable({
  events,
  isLoading,
  getEventTypeColor,
  eventTypesObj,
  onEdit,
  onDelete
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  if (!events || events.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Tidak ada event yang ditemukan</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nama Event</TableHead>
          <TableHead>Tipe Event</TableHead>
          <TableHead>Waktu Mulai</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.eventId}>
            <TableCell>{event.eventId.slice(0, 6)}</TableCell>
            <TableCell>
              <div className="font-medium">{event.eventName}</div>
              <div className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className={getEventTypeColor(event.eventType)}>
                {eventTypesObj[event.eventType]}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(event.startEvent)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(event)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(event.eventId)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

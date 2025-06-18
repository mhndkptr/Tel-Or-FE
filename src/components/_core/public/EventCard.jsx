"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarIcon, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventCard({ event }) {
  const router = useRouter();

  // Format date function for event dates (dd/mm/yyyy)
  const formatEventDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Check if event has prize (Lomba or Beasiswa)
  const hasPrize = (category) => {
    return category === "Lomba" || category === "Beasiswa";
  };

  return (
    <Card key={event?.eventId} className="flex flex-col h-full overflow-hidden">
      {/* Photo Section */}
      <CardContent
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}${event?.image[0]})`,
        }}
      >
        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center text-center text-white p-4">
          {/* Event Name */}
          <h3 className="text-lg text-black font-bold mb-2">
            {event?.eventName}
          </h3>

          {/* Event Type */}
          <div className="mt-2">
            <span className="bg-pink-500 bg-opacity-80 px-3 py-1 rounded-full text-xs font-medium">
              {event.eventType}
            </span>
          </div>

          {/* Prize Badge for Lomba and Beasiswa */}
          {hasPrize(event.eventType) && event?.prize && (
            <div className="mt-2">
              <span className="bg-yellow-500 bg-opacity-90 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1">
                <Trophy className="h-3 w-3" />
                {formatCurrency(0)}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardContent className="flex-1 flex flex-col justify-between p-6">
        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
            {event?.description}
          </p>
        </div>

        {/* Event Region */}
        {event.eventRegion &&
          (["SEMINAR", "LOMBA", "BEASISWA"].includes(event.eventType)) && (
            <div className="mb-4">
              <span className="bg-red-500 bg-opacity-80 px-3 py-1 rounded-full text-xs font-medium text-white">
                {event.eventRegion}
              </span>
            </div>
          )}

        {/* Event Dates */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              Tanggal Mulai:{" "}
              {event.startEvent && formatEventDate(event.startEvent)}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              Tanggal Selesai:{" "}
              {event.endEvent && formatEventDate(event.endEvent)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          onClick={() => router.push(`/event/${event.eventId}`)}
        >
          Detail
        </Button>
      </CardFooter>
    </Card>
  );
}

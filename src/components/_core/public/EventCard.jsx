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
    return category === "LOMBA" || category === "BEASISWA";
  };

  const getEventTypeColor = (eventTypeKey) => {
    const labelMap = {
      SEMINAR: "Seminar",
      LOMBA: "Lomba",
      BEASISWA: "Beasiswa",
      COMPANY_VISIT: "Company Visit",
      OPEN_RECRUITMENT: "Open Recruitment",
    };
    const label = labelMap[eventTypeKey] || eventTypeKey;
    const colors = {
      Seminar: "bg-blue-100 text-blue-800",
      Lomba: "bg-red-100 text-red-800",
      Beasiswa: "bg-green-100 text-green-800",
      "Company Visit": "bg-purple-100 text-purple-800",
      "Open Recruitment": "bg-orange-100 text-orange-800",
    };
    return colors[label] || "bg-gray-100 text-gray-800";
  };

  const getEventRegionColor = (region) => {
    const colors = {
      Regional: "bg-pink-100 text-pink-800",
      National: "bg-indigo-100 text-indigo-800",
      International: "bg-teal-100 text-teal-800",
    };
    return colors[region] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card key={event?.eventId} className="flex flex-col h-full overflow-hidden">
      {/* Photo Section */}
      <CardContent
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url("${process.env.NEXT_PUBLIC_API_BASE_URL}${event?.image[0]}")`,
        }}
      ></CardContent>

      <CardContent className="flex-1 flex flex-col justify-between p-6">
        {/* Event Name */}
        <h3 className="text-lg text-black font-bold mb-2">
          {event?.eventName}
        </h3>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
            {event?.description}
          </p>
        </div>

        {/* Tags: Event Type & Event Region */}
        <div className="flex items-center gap-2 mb-4">
          {/* Event Type */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
              event.eventType
            )}`}
          >
            {(() => {
              const labelMap = {
                SEMINAR: "Seminar",
                LOMBA: "Lomba",
                BEASISWA: "Beasiswa",
                COMPANY_VISIT: "Company Visit",
                OPEN_RECRUITMENT: "Open Recruitment",
              };
              return labelMap[event.eventType] || event.eventType;
            })()}
          </span>

          {/* Event Region */}
          {event.eventRegion &&
            ["SEMINAR", "LOMBA", "BEASISWA"].includes(event.eventType) && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getEventRegionColor(
                  event.eventRegion
                )}`}
              >
                {event.eventRegion}
              </span>
            )}
        </div>

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

        {/* Prize Badge for Lomba and Beasiswa */}
        {hasPrize(event.eventType) && event?.prize && (
          <div className="mt-2">
            <span className="bg-yellow-500 bg-opacity-90 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1">
              <Trophy className="h-3 w-3" />
              {formatCurrency(parseFloat(event?.prize) || 0)}
            </span>
          </div>
        )}
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

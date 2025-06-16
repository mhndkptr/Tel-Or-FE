"use client";

import * as React from "react";
import { Search, Filter, CalendarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useGetAllEvent } from "@/hooks/event.hooks";
import EventCard from "@/components/_core/public/EventCard";

export default function EventPage() {
  const [selectedType, setSelectedType] = React.useState("");
  const { eventsData, isLoading, isPending, refetch } = useGetAllEvent();
  const [dateRange, setDateRange] = React.useState({
    from: undefined,
    to: undefined,
  });

  const eventTypes = [
    "SEMINAR",
    "LOMBA",
    "BEASISWA",
    "COMPANY VISIT",
    "OPEN RECRUITMENT",
  ];

  console.log("eventsData", eventsData);

  // Format date function for date range picker
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const resetTypeFilter = () => {
    setSelectedType("");
  };

  const resetDateFilter = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  const filteredEvents = (eventsData || []).filter((event) => {
    const typeMatch = selectedType ? event.eventType === selectedType : true;

    let dateMatch = true;

    if (dateRange && dateRange.from && dateRange.to) {
      const eventStart = new Date(event.startEvent);
      dateMatch = eventStart >= dateRange.from && eventStart <= dateRange.to;
    } else if (dateRange && dateRange.from) {
      const eventStart = new Date(event.startEvent);
      dateMatch = eventStart >= dateRange.from;
    } else if (dateRange && dateRange.to) {
      const eventStart = new Date(event.startEvent);
      dateMatch = eventStart <= dateRange.to;
    }

    return typeMatch && dateMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">
            <span className="text-red-600">Event</span>{" "}
            <span className="text-black">List</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search Event..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filter Tipe Event dengan Reset Button */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-sm"
                  >
                    <Filter className="h-4 w-4" />
                    {selectedType
                      ? selectedType.replace("_", " ")
                      : "Filter Tipe Event"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {eventTypes.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onSelect={() => setSelectedType(type.toUpperCase())}
                    >
                      {type}
                    </DropdownMenuItem>
                  ))}
                  {selectedType && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={resetTypeFilter}
                        className="text-red-600 focus:text-red-600"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reset Filter
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Filter Waktu dengan Date Range Picker */}
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {formatDate(dateRange.from)} -{" "}
                          {formatDate(dateRange.to)}
                        </>
                      ) : (
                        formatDate(dateRange.from)
                      )
                    ) : (
                      <span>Pilih Rentang Tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range || { from: undefined, to: undefined });
                    }}
                    numberOfMonths={2}
                  />
                  {(dateRange.from || dateRange.to) && (
                    <div className="p-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetDateFilter}
                        className="w-full text-red-600 hover:text-red-600"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reset Tanggal
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredEvents || []).map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

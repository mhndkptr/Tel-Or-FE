"use client";

import { ArrowLeft, CalendarIcon, Trophy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetEventById } from "@/hooks/event.hooks";

export default function EventDetailPage({}) {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId;
  const { eventData, isLoading, isPending, refetch } = useGetEventById(eventId);

  // Format date function
  const formatEventDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Check if event has prize
  const hasPrize = (category) => {
    return category === "Lomba" || category === "Beasiswa";
  };

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Event Tidak Ditemukan
          </h1>
          <Button
            onClick={() => router.push("/event")}
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            Kembali ke Event List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/event")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Event List
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Event Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {eventData?.eventName}
          </h1>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-pink-500 text-white px-4 py-2 text-sm"
            >
              {eventData?.eventType}
            </Badge>
            {hasPrize(eventData?.eventType) && eventData?.prize && (
              <Badge
                variant="secondary"
                className="bg-yellow-500 text-white px-4 py-2 flex items-center gap-1 text-sm"
              >
                <Trophy className="h-4 w-4" />
                {formatCurrency(eventData?.prize)}
              </Badge>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <div
            className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}${
                eventData?.image && eventData?.image[0]
              })`,
            }}
          >
            <div className="w-full h-full bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h2 className="text-3xl font-bold mb-4">
                  {eventData?.eventName}
                </h2>
                <p className="text-lg opacity-90 max-w-2xl">
                  {eventData?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div
                  className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: eventData?.content }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-800">
                  Informasi Event
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Tanggal Mulai
                      </p>
                      <p className="font-medium text-gray-800">
                        {eventData?.startEvent &&
                          formatEventDate(eventData?.startEvent)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Tanggal Selesai
                      </p>
                      <p className="font-medium text-gray-800">
                        {eventData?.endEvent &&
                          formatEventDate(eventData?.endEvent)}
                      </p>
                    </div>
                  </div>

                  {hasPrize(eventData.eventType) && eventData?.prize && (
                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {eventData.eventType === "Lomba"
                            ? "Total Hadiah"
                            : "Nilai Beasiswa"}
                        </p>
                        <p className="font-bold text-yellow-600">
                          {formatCurrency(eventData?.prize)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

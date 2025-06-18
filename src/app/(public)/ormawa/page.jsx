"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetAllOrmawa } from "@/hooks/ormawa.hooks";

export default function Home() {
  const { ormawaData, isLoading } = useGetAllOrmawa();
  const [search, setSearch] = useState("");

  if (isLoading) return <div>Loading...</div>;

  // Filter by search
  const filtered = ormawaData.filter((o) =>
    o.ormawaName?.toLowerCase().includes(search.toLowerCase()) ||
    o.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          <span className="text-red-600">Ormawa</span> List
        </h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search Ormawa..."
            className="w-full py-6"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Ormawa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">
              Tidak ada data Ormawa
            </div>
          )}
          {filtered.map((ormawa) => (
            <div key={ormawa.id} className="border-2 border-gray-300 rounded-3xl p-6 bg-white flex flex-col">
              <div className="text-center mb-4">
                {ormawa.iconUrl ? (
                  <Image
                    src={ormawa.iconUrl}
                    alt={ormawa.ormawaName}
                    width={120}
                    height={120}
                    className="h-28 w-28 mx-auto object-contain rounded-full bg-gray-100"
                  />
                ) : (
                  <div className="h-28 w-28 flex items-center justify-center mx-auto bg-gray-100 rounded-full">
                    <span className="text-4xl">🏛️</span>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-center mb-2">{ormawa.ormawaName}</h3>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {ormawa.category && (
                  <span className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
                    {ormawa.category}
                  </span>
                )}
                {ormawa.labType && (
                  <span className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {ormawa.labType}
                  </span>
                )}
                {ormawa.ukmCategory && (
                  <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {ormawa.ukmCategory}
                  </span>
                )}
              </div>

              {/* Status Pendaftaran */}
              <div className="mb-2 text-center">
                {ormawa.isOpenRegistration ? (
                  <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                    Pendaftaran Dibuka
                  </span>
                ) : (
                  <span className="inline-block bg-gray-200 text-gray-500 px-2 py-0.5 rounded text-xs font-semibold">
                    Pendaftaran Ditutup
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
                {ormawa.description}
              </p>

              {/* Content (optional, if available) */}
              {ormawa.content && (
                <div className="text-xs text-gray-500 text-center mb-4 line-clamp-3">
                  {ormawa.content}
                </div>
              )}

              {/* Background image preview (optional) */}
              {ormawa.backgroundUrl && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={ormawa.backgroundUrl}
                    alt={ormawa.ormawaName + " background"}
                    width={240}
                    height={80}
                    className="rounded-xl object-cover h-20 w-60"
                  />
                </div>
              )}

              <Button asChild variant="destructive" className="w-full mt-auto">
                <Link href={`/ormawa/${ormawa.id}`}>Detail</Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
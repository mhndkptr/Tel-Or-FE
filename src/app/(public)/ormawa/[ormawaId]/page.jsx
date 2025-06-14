"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function OrmawaDetailPage({params}) {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-8 container mx-auto">
      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 mb-4"
      >
        ←  Ormawa List
      </button>
      <h1>{params.OrmawaId}</h1>

      {/* Ormawa Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Central Computer Improvement (CCI)
        <br /><br />
      </h1>

      {/* Logo + Deskripsi */}
      <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start">
        <Image
          src="/cci-logo.png"
          alt="Logo CCI"
          width={250}
          height={250}
          className="rounded-xl object-contain bg-white shadow"
        />

        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet enim eget nisl faucibus vestibulum. 
            Etiam vitae venenatis nulla. Pellentesque quis tincidunt dolor, ac condimentum libero.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Pellentesque quis tincidunt dolor, ac condimentum libero. Nunc at ipsum tempor, feugiat augue sollicitudin, 
            finibus dolor.
          </p>

          {/* Registration Status */}
          <div className="mt-6">
            <Button variant="destructive" disabled>
              Closed Registration
            </Button>
          </div>
        </div>
      </div>

      {/* Struktur Organisasi */}
      <h2 className="text-2xl font-semibold mb-4">Struktur Organisasi</h2>
      <div className="w-full flex justify-center">
        <Image
          src="/struktur-organisasi.png"
          alt="Struktur Organisasi"
          width={700}
          height={500}
          className="rounded-lg shadow"
        />
      </div>
    </div>
  )
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="pt-8 pb-8">
          <div className="mb-6">
            <div className="text-8xl font-bold text-primary mb-2">404</div>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Halaman Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL salah.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                asChild
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => router.back()}
              >
                <div>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

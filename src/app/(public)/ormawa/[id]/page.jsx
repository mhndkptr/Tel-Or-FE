"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetOrmawaById } from "@/hooks/ormawa.hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building2, FileText, ImageIcon, Calendar, CheckCircle, XCircle } from "lucide-react";

const CATEGORY_COLORS = {
  LAB: "bg-purple-100 text-purple-800 border-purple-200",
  ORGANIZATION: "bg-pink-100 text-pink-800 border-pink-200",
  UKM: "bg-green-100 text-green-800 border-green-200",
  COMMUNITY: "bg-blue-100 text-blue-800 border-blue-200",
};

const LAB_TYPE_COLORS = {
  PRAKTIKUM: "bg-orange-100 text-orange-800 border-orange-200",
  RESEARCH: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export default function OrmawaDetailPage() {
  const params = useParams();
  const router = useRouter();
  if (!params.id) return <div>Invalid ID</div>;
  console.log("Ormawa ID dari params:", params.id);
  console.log("Ormawa ID dari params:", params.ormawaId);
  const { ormawaData, isLoading } = useGetOrmawaById(params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat detail ormawa...</p>
        </div>
      </div>
    );
  }

  if (!ormawaData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Ormawa yang Anda cari tidak dapat ditemukan.</p>
          <Button onClick={() => router.push("/ormawa")} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/ormawa")}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke daftar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <Card className="shadow-xl border-0 overflow-hidden py-0">
            {/* Hero Section */}
            <div
              className="relative text-white p-8 h-56 flex items-end rounded-b-xl overflow-hidden"
              style={{
                backgroundImage: `url("${process.env.NEXT_PUBLIC_API_BASE_URL}${ormawaData.background}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{ormawaData.ormawaName}</h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge
                      className={`${
                        CATEGORY_COLORS[ormawaData.category] || "bg-gray-100 text-gray-800 border-gray-200"
                      } px-3 py-1 text-sm font-semibold`}
                    >
                      <Building2 className="w-3 h-3 mr-1" />
                      {ormawaData.category}
                    </Badge>

                    {ormawaData.labType && ormawaData.category === "LAB" && (
                      <Badge
                        className={`${
                          LAB_TYPE_COLORS[ormawaData.labType] || "bg-gray-100 text-gray-800 border-gray-200"
                        } px-3 py-1 text-sm font-semibold`}
                      >
                        {ormawaData.labType}
                      </Badge>
                    )}

                    {ormawaData.ukmCategory && ormawaData.category === "UKM" && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 text-sm font-semibold">
                        {ormawaData.ukmCategory}
                      </Badge>
                    )}
                  </div>

                  {/* Registration Status */}
                  <div className="flex items-center gap-2">
                    {ormawaData.isOpenRegistration ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-300 font-medium">Pendaftaran Dibuka</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-200 font-medium">Pendaftaran Ditutup</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              {/* Description Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Deskripsi</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">{ormawaData.description}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="mb-8">
                <div className="rounded-lg">
                  <div
                    className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:mb-4 prose-li:text-gray-600 prose-strong:text-gray-800 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: ormawaData?.content }}
                  />
                </div>
              </div>

              <Separator className="my-8" />

              {/* Registration Status Card */}
              <Card
                className={`border-2 ${
                  ormawaData.isOpenRegistration ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {ormawaData.isOpenRegistration ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Status Pendaftaran</h3>
                        <p className={`text-sm ${ormawaData.isOpenRegistration ? "text-green-600" : "text-red-600"}`}>
                          {ormawaData.isOpenRegistration
                            ? "Pendaftaran sedang dibuka untuk anggota baru"
                            : "Pendaftaran saat ini ditutup"}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`px-4 py-2 text-sm font-semibold ${
                        ormawaData.isOpenRegistration
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {ormawaData.isOpenRegistration ? "DIBUKA" : "DITUTUP"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

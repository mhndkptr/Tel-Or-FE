"use client";

import { DashboardHeader } from "@/components/_shared/header/DashboardHeader";

export default function DashboardOverviewPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <main className="md:p-5 p-3 bg-[#FCFCFC] min-h-screen space-y-5">
        {/* Info Section */}
        <section className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] text-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2">Selamat datang di Backoffice</h2>
          <p className="text-sm mb-4">
            Kelola semua aktivitas dan data sistem secara efisien melalui halaman ini. Backoffice dirancang untuk
            memudahkan admin dan organizer.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Manajemen Pengguna</h3>
            <p className="text-sm text-gray-600">
              Tambah, edit, atau hapus data pengguna, termasuk peran admin dan organizer.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Event & Kegiatan</h3>
            <p className="text-sm text-gray-600">Buat dan atur event atau kegiatan kampus agar selalu up-to-date.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Manajemen Ormawa</h3>
            <p className="text-sm text-gray-600">Kelola organisasi mahasiswa dan struktur anggotanya dengan mudah.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Postingan & Informasi</h3>
            <p className="text-sm text-gray-600">Atur konten informasi, berita, dan update penting di platform.</p>
          </div>
        </section>
      </main>
    </>
  );
}

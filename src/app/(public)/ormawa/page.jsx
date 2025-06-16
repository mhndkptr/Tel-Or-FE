import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          <span className="text-red-600">Ormawa</span> List
        </h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Input type="text" placeholder="Search Ormawa..." className="w-full py-6" />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Ormawa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* BEM Card */}
          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white">
            <div className="text-center mb-4">
              <Image
                  src="/bem-logo.png"
                  alt="BEM Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              <div className="text-sm text-gray-600 mb-1">BEM</div>
              <div className="text-sm text-gray-600">(Badan Eksekutif Mahasiswa)</div>
            </div>

            <h3 className="font-bold text-lg text-center mb-3">BEM (Badan Eksekutif Mahasiswa)</h3>

            <div className="mb-4">
              <span className="inline-block bg-pink-200 text-pink-800 px-4 py-1 rounded-full text-sm font-medium w-full text-center">
                Eksekutif
              </span>
            </div>

            <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
              Organisasi tertinggi kemahasiswaan yang mengkoordinir seluruh kegiatan mahasiswa di Telkom University.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                150 Anggota
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Presiden BEM
              </div>
            </div>

            <Button asChild variant="destructive" className="w-full">
              <Link href="/ormawa/bem">Detail</Link>
            </Button>
          </div>

          {/* HMIF Card */}
          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white">
            <div className="text-center mb-4">
              <Image
                  src="/HIMAIF.png"
                  alt="Central Computer Improvement Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              <div className="text-sm text-gray-600 mb-1">HIMA IF</div>
              <div className="text-sm text-gray-600">(Himpunan Mahasiswa Informatika)</div>
            </div>

            <h3 className="font-bold text-lg text-center mb-3">HMIF (Himpunan Mahasiswa Informatika)</h3>

            <div className="mb-4">
              <span className="inline-block bg-pink-200 text-pink-800 px-4 py-1 rounded-full text-sm font-medium w-full text-center">
                Himpunan
              </span>
            </div>

            <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
              Wadah aspirasi dan pengembangan mahasiswa Program Studi Teknik Informatika.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                200 Anggota
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ketua HMIF
              </div>
            </div>

            <Button asChild variant="destructive" className="w-full">
              <Link href="/ormawa/hmif">Detail</Link>
            </Button>
          </div>

          {/* UKM Robotika Card */}
          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white">
            <div className="text-center mb-4">
              <Image
                  src="/robotika.png"
                  alt="Robotika Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              <div className="text-sm text-gray-600 mb-1">UKM</div>
              <div className="text-sm text-gray-600">Robotika</div>
            </div>

            <h3 className="font-bold text-lg text-center mb-3">UKM Robotika</h3>

            <div className="mb-4">
              <span className="inline-block bg-pink-200 text-pink-800 px-4 py-1 rounded-full text-sm font-medium w-full text-center">
                UKM
              </span>
            </div>

            <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
              Unit Kegiatan Mahasiswa yang fokus pada pengembangan teknologi robotika dan AI.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                80 Anggota
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ketua UKM Robotika
              </div>
            </div>

            <Button asChild variant="destructive" className="w-full">
              <Link href="/ormawa/ukm-robotika">Detail</Link>
            </Button>
          </div>

          {/* Additional Cards - Repeat pattern */}
          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white">
            <div className="text-center mb-4">
              <Image
                  src="/seni.png"
                  alt="Seni Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              <div className="text-sm text-gray-600 mb-1">UKM</div>
              <div className="text-sm text-gray-600">Seni</div>
            </div>

            <h3 className="font-bold text-lg text-center mb-3">UKM Seni</h3>

            <div className="mb-4">
              <span className="inline-block bg-pink-200 text-pink-800 px-4 py-1 rounded-full text-sm font-medium w-full text-center">
                UKM
              </span>
            </div>

            <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
              Unit Kegiatan Mahasiswa yang fokus pada pengembangan bakat seni dan kreativitas mahasiswa.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                120 Anggota
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ketua UKM Seni
              </div>
            </div>

            <Button asChild variant="destructive" className="w-full">
              <Link href="/ormawa/ukm-seni">Detail</Link>
            </Button>
          </div>

          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white">
            <div className="text-center mb-4">
              <Image
                  src="/olahraga.png"
                  alt="Olahraga Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              <div className="text-sm text-gray-600 mb-1">UKM</div>
              <div className="text-sm text-gray-600">Olahraga</div>
            </div>

            <h3 className="font-bold text-lg text-center mb-3">UKM Olahraga</h3>

            <div className="mb-4">
              <span className="inline-block bg-pink-200 text-pink-800 px-4 py-1 rounded-full text-sm font-medium w-full text-center">
                UKM
              </span>
            </div>

            <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
              Unit Kegiatan Mahasiswa yang fokus pada pengembangan prestasi olahraga mahasiswa.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                180 Anggota
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ketua UKM Olahraga
              </div>
            </div>

            <Button asChild variant="destructive" className="w-full">
              <Link href="/ormawa/ukm-olahraga">Detail</Link>
            </Button>
          </div>

          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white">
            <div className="text-center mb-4">
              <Image
                  src="/HMSI.png"
                  alt="HMSI Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              <div className="text-sm text-gray-600 mb-1">HMSI</div>
              <div className="text-sm text-gray-600">Sistem Informasi</div>
            </div>

            <h3 className="font-bold text-lg text-center mb-3">Himpunan Mahasiswa Sistem Informasi</h3>

            <div className="mb-4">
              <span className="inline-block bg-pink-200 text-pink-800 px-4 py-1 rounded-full text-sm font-medium w-full text-center">
                Himpunan
              </span>
            </div>

            <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
              Himpunan Mahasiswa Program Studi yang fokus pada pengembangan mahasiswa Sistem Informasi.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                160 Anggota
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ketua HMSI
              </div>
            </div>

            <Button asChild variant="destructive" className="w-full">
              <Link href="/ormawa/hmps-si">Detail</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Users, Phone, Mail, MapPin, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Data organisasi
const organizationData = {
  bem: {
    id: "bem",
    name: "BEM (Badan Eksekutif Mahasiswa)",
    shortName: "BEM",
    category: "Eksekutif",
    categoryColor: "bg-pink-200 text-pink-800",
    icon: "🏛️",
    description:
      "Organisasi tertinggi kemahasiswaan yang mengkoordinir seluruh kegiatan mahasiswa di Telkom University.",
    longDescription:
      "Badan Eksekutif Mahasiswa (BEM) merupakan lembaga eksekutif di tingkat universitas yang bertugas sebagai koordinator seluruh kegiatan kemahasiswaan. BEM berperan dalam menyuarakan aspirasi mahasiswa, mengkoordinasikan kegiatan organisasi kemahasiswaan, serta menjadi jembatan komunikasi antara mahasiswa dengan pihak universitas.",
    members: 150,
    leader: "Presiden BEM",
    leaderName: "Ahmad Rizki Pratama",
    contact: {
      phone: "+62 812-3456-7890",
      email: "bem@telkomuniversity.ac.id",
      office: "Gedung Student Center Lt. 2",
    },
    established: "2010",
    achievements: [
      "Juara 1 Kompetisi BEM Se-Jawa Barat 2023",
      "Best Practice Student Government 2022",
      "Penyelenggara Terbaik Dies Natalis Tel-U 2023",
    ],
    programs: ["Aspirasi Mahasiswa", "Koordinasi Ormawa", "Advokasi Mahasiswa", "Pengembangan Soft Skills"],
    socialMedia: {
      instagram: "@bem_telkomuniversity",
      twitter: "@BEM_TelU",
      website: "bem.telkomuniversity.ac.id",
    },
  },
  hmif: {
    id: "hmif",
    name: "HMIF (Himpunan Mahasiswa Informatika)",
    shortName: "HMIF",
    category: "Himpunan",
    categoryColor: "bg-blue-200 text-blue-800",
    icon: "💻",
    description: "Wadah aspirasi dan pengembangan mahasiswa Program Studi Teknik Informatika.",
    longDescription:
      "Himpunan Mahasiswa Informatika (HMIF) adalah organisasi kemahasiswaan yang menaungi seluruh mahasiswa Program Studi Teknik Informatika. HMIF berperan dalam mengembangkan potensi akademik dan non-akademik mahasiswa informatika melalui berbagai kegiatan seperti seminar teknologi, kompetisi programming, dan workshop pengembangan skill.",
    members: 200,
    leader: "Ketua HMIF",
    leaderName: "Sari Dewi Lestari",
    contact: {
      phone: "+62 813-4567-8901",
      email: "hmif@telkomuniversity.ac.id",
      office: "Gedung Informatika Lt. 3",
    },
    established: "2008",
    achievements: [
      "Juara 2 Hackathon Nasional 2023",
      "Best IT Community Award 2022",
      "Penyelenggara IT Festival Terbesar 2023",
    ],
    programs: ["Seminar Teknologi", "Workshop Programming", "Kompetisi Coding", "Magang Industri"],
    socialMedia: {
      instagram: "@hmif_telkomuniversity",
      twitter: "@HMIF_TelU",
      website: "hmif.telkomuniversity.ac.id",
    },
  },
  "ukm-robotika": {
    id: "ukm-robotika",
    name: "UKM Robotika",
    shortName: "UKM Robotika",
    category: "UKM",
    categoryColor: "bg-green-200 text-green-800",
    icon: "🤖",
    description: "Unit Kegiatan Mahasiswa yang fokus pada pengembangan teknologi robotika dan AI.",
    longDescription:
      "UKM Robotika adalah unit kegiatan mahasiswa yang berfokus pada pengembangan teknologi robotika, artificial intelligence, dan Internet of Things (IoT). Melalui berbagai project dan kompetisi, anggota UKM Robotika mengembangkan kemampuan teknis dalam merancang, membangun, dan memprogram robot untuk berbagai keperluan.",
    members: 80,
    leader: "Ketua UKM Robotika",
    leaderName: "Budi Santoso",
    contact: {
      phone: "+62 814-5678-9012",
      email: "robotika@telkomuniversity.ac.id",
      office: "Lab Robotika Gedung Teknik",
    },
    established: "2015",
    achievements: [
      "Juara 1 Kontes Robot Indonesia 2023",
      "Best Innovation Award Robot Competition 2022",
      "Pemenang Kompetisi AI Challenge 2023",
    ],
    programs: ["Workshop Robotika", "Kompetisi Robot", "Research & Development", "Pelatihan AI & IoT"],
    socialMedia: {
      instagram: "@robotika_telu",
      twitter: "@Robotika_TelU",
      website: "robotika.telkomuniversity.ac.id",
    },
  },
  "ukm-seni": {
    id: "ukm-seni",
    name: "UKM Seni",
    shortName: "UKM Seni",
    category: "UKM",
    categoryColor: "bg-purple-200 text-purple-800",
    icon: "🎨",
    description: "Unit Kegiatan Mahasiswa yang fokus pada pengembangan bakat seni dan kreativitas mahasiswa.",
    longDescription:
      "UKM Seni merupakan wadah bagi mahasiswa untuk mengembangkan bakat dan minat di bidang seni. Meliputi berbagai cabang seni seperti musik, tari, teater, seni rupa, dan fotografi. UKM Seni aktif dalam berbagai pertunjukan dan pameran baik di tingkat kampus maupun eksternal.",
    members: 120,
    leader: "Ketua UKM Seni",
    leaderName: "Maya Sari Indah",
    contact: {
      phone: "+62 815-6789-0123",
      email: "seni@telkomuniversity.ac.id",
      office: "Gedung Seni & Budaya Lt. 1",
    },
    established: "2012",
    achievements: [
      "Juara 1 Festival Seni Mahasiswa Jawa Barat 2023",
      "Best Performance Award 2022",
      "Penyelenggara Art Exhibition Terbesar 2023",
    ],
    programs: ["Pertunjukan Seni", "Workshop Kreatif", "Pameran Karya Seni", "Pelatihan Musik & Tari"],
    socialMedia: {
      instagram: "@seni_telu",
      twitter: "@Seni_TelU",
      website: "seni.telkomuniversity.ac.id",
    },
  },
  "ukm-olahraga": {
    id: "ukm-olahraga",
    name: "UKM Olahraga",
    shortName: "UKM Olahraga",
    category: "UKM",
    categoryColor: "bg-orange-200 text-orange-800",
    icon: "⚽",
    description: "Unit Kegiatan Mahasiswa yang fokus pada pengembangan prestasi olahraga mahasiswa.",
    longDescription:
      "UKM Olahraga adalah unit kegiatan mahasiswa yang menaungi berbagai cabang olahraga di Telkom University. Bertujuan untuk mengembangkan prestasi olahraga mahasiswa melalui latihan rutin, kompetisi, dan pembinaan atlet. UKM Olahraga membina berbagai cabang seperti sepak bola, basket, voli, badminton, dan atletik.",
    members: 180,
    leader: "Ketua UKM Olahraga",
    leaderName: "Andi Wijaya",
    contact: {
      phone: "+62 816-7890-1234",
      email: "olahraga@telkomuniversity.ac.id",
      office: "Gedung Olahraga Tel-U",
    },
    established: "2009",
    achievements: ["Juara Umum POMNAS 2023", "Medali Emas Badminton LIMA 2022", "Best Sports Community Award 2023"],
    programs: ["Latihan Rutin", "Kompetisi Antar Kampus", "Pembinaan Atlet", "Tournament Internal"],
    socialMedia: {
      instagram: "@olahraga_telu",
      twitter: "@Olahraga_TelU",
      website: "olahraga.telkomuniversity.ac.id",
    },
  },
  "hmps-si": {
    id: "hmps-si",
    name: "HMPS Sistem Informasi",
    shortName: "HMPS SI",
    category: "Himpunan",
    categoryColor: "bg-indigo-200 text-indigo-800",
    icon: "📚",
    description: "Himpunan Mahasiswa Program Studi yang fokus pada pengembangan mahasiswa Sistem Informasi.",
    longDescription:
      "Himpunan Mahasiswa Program Studi Sistem Informasi (HMPS SI) adalah organisasi kemahasiswaan yang menaungi mahasiswa Program Studi Sistem Informasi. HMPS SI berperan dalam mengembangkan kemampuan akademik dan profesional mahasiswa melalui berbagai kegiatan seperti seminar bisnis, workshop sistem informasi, dan program magang industri.",
    members: 160,
    leader: "Ketua HMPS SI",
    leaderName: "Rina Kartika Sari",
    contact: {
      phone: "+62 817-8901-2345",
      email: "hmps.si@telkomuniversity.ac.id",
      office: "Gedung Sistem Informasi Lt. 2",
    },
    established: "2011",
    achievements: [
      "Best Business Plan Competition 2023",
      "Juara 2 Sistem Informasi Challenge 2022",
      "Outstanding Student Organization 2023",
    ],
    programs: ["Seminar Bisnis & IT", "Workshop Sistem Informasi", "Business Plan Competition", "Industry Networking"],
    socialMedia: {
      instagram: "@hmps.si_telu",
      twitter: "@HMPS_SI_TelU",
      website: "hmps-si.telkomuniversity.ac.id",
    },
  },
}

export default function OrganizationDetail({ params }) {
  const { ormawaId } = params
  const org = organizationData[ormawaId]

  if (!org) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Organisasi tidak ditemukan</h1>
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col"> 
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/ormawa">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Kembali ke Daftar Ormawa
            </Button>
          </Link>
        </div>

        {/* Organization Header */}
        <div className="bg-white rounded-3xl border-2 border-gray-300 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl">{org.icon}</div>
            <div className="text-center md:text-left flex-1">
              <Badge className={`${org.categoryColor} mb-3`}>{org.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{org.name}</h1>
              <p className="text-gray-600 text-lg">{org.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Tentang {org.shortName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{org.longDescription}</p>
              </CardContent>
            </Card>

            {/* Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Program Kegiatan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {org.programs.map((program, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">{program}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="text-yellow-600" size={20} />
                  Prestasi & Penghargaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {org.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Singkat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Jumlah Anggota</p>
                    <p className="font-semibold">{org.members} Anggota</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Didirikan</p>
                    <p className="font-semibold">{org.established}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-purple-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">{org.leader}</p>
                    <p className="font-semibold">{org.leaderName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Telepon</p>
                    <p className="font-semibold">{org.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-red-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{org.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Kantor</p>
                    <p className="font-semibold">{org.contact.office}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={`https://instagram.com/${org.socialMedia.instagram.replace("@", "")}`}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white text-sm">
                    IG
                  </div>
                  <span className="text-gray-700">{org.socialMedia.instagram}</span>
                </a>
                <a
                  href={`https://twitter.com/${org.socialMedia.twitter.replace("@", "")}`}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
                    TW
                  </div>
                  <span className="text-gray-700">{org.socialMedia.twitter}</span>
                </a>
                <a
                  href={`https://${org.socialMedia.website}`}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center text-white text-sm">
                    WEB
                  </div>
                  <span className="text-gray-700">{org.socialMedia.website}</span>
                </a>
              </CardContent>
            </Card>

            {/* Join Button */}
            <Card>
              <CardContent className="pt-6">
                <Button className="w-full bg-red-600 hover:bg-red-700">Bergabung dengan {org.shortName}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

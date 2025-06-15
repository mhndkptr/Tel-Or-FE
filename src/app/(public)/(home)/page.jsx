"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, MapPin, Users, ChevronRight, MessageCircle, Phone } from "lucide-react"

export default function HomePage() {
  const [landingData, setLandingData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to /api/landing
    const fetchLandingData = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = {
          ormawaEvents: [
            {
              id: 1,
              title: "Tech Innovation Summit 2024",
              description: "Kompetisi inovasi teknologi terbesar di Telkom University dengan hadiah jutaan rupiah.",
              date: "2024-03-15",
              location: "Auditorium Telkom University",
              organizer: "HMIF (Himpunan Mahasiswa Informatika)",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 2,
              title: "Digital Marketing Workshop",
              description:
                "Workshop intensif digital marketing untuk mahasiswa yang ingin mengembangkan skill pemasaran digital.",
              date: "2024-03-20",
              location: "Lab Komputer Gedung B",
              organizer: "HMSI (Himpunan Mahasiswa Sistem Informasi)",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 3,
              title: "Entrepreneurship Bootcamp",
              description: "Bootcamp kewirausahaan dengan mentor dari startup unicorn Indonesia.",
              date: "2024-03-25",
              location: "Ruang Seminar Lantai 3",
              organizer: "BEM (Badan Eksekutif Mahasiswa)",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
          ormawaOrganizations: [
            {
              id: 1,
              name: "BEM (Badan Eksekutif Mahasiswa)",
              description:
                "Organisasi tertinggi kemahasiswaan yang mengkoordinir seluruh kegiatan mahasiswa di Telkom University.",
              category: "Eksekutif",
              memberCount: 150,
              logo: "/placeholder.svg?height=100&width=100",
              contactPerson: "President BEM",
            },
            {
              id: 2,
              name: "HMIF (Himpunan Mahasiswa Informatika)",
              description: "Wadah aspirasi dan pengembangan mahasiswa Program Studi Teknik Informatika.",
              category: "Himpunan",
              memberCount: 200,
              logo: "/placeholder.svg?height=100&width=100",
              contactPerson: "Ketua HMIF",
            },
            {
              id: 3,
              name: "UKM Robotika",
              description: "Unit Kegiatan Mahasiswa yang fokus pada pengembangan teknologi robotika dan AI.",
              category: "UKM",
              memberCount: 80,
              logo: "/placeholder.svg?height=100&width=100",
              contactPerson: "Ketua UKM Robotika",
            },
          ],
          faqs: [
            {
              id: 1,
              question: "Apa itu Ormawa di Telkom University?",
              answer:
                "Ormawa (Organisasi Kemahasiswaan) adalah organisasi yang dibentuk oleh dan untuk mahasiswa sebagai wadah pengembangan minat, bakat, dan potensi diri. Di Telkom University, terdapat berbagai jenis ormawa seperti BEM, Himpunan, UKM, dan organisasi lainnya.",
            },
            {
              id: 2,
              question: "Bagaimana cara bergabung dengan Ormawa?",
              answer:
                "Untuk bergabung dengan Ormawa, mahasiswa dapat mengikuti open recruitment yang biasanya diadakan di awal semester. Informasi recruitment akan diumumkan melalui media sosial resmi masing-masing organisasi dan portal mahasiswa.",
            },
            {
              id: 3,
              question: "Apa manfaat bergabung dengan Ormawa?",
              answer:
                "Bergabung dengan Ormawa memberikan banyak manfaat seperti pengembangan soft skills, networking, pengalaman organisasi, sertifikat kegiatan, dan kesempatan untuk mengembangkan leadership skills.",
            },
            {
              id: 4,
              question: "Apakah ada biaya untuk bergabung dengan Ormawa?",
              answer:
                "Sebagian besar Ormawa di Telkom University tidak mengenakan biaya keanggotaan. Namun, untuk kegiatan tertentu mungkin ada kontribusi atau biaya partisipasi yang akan diinformasikan sebelumnya.",
            },
            {
              id: 5,
              question: "Bagaimana cara mendapatkan informasi event Ormawa terbaru?",
              answer:
                "Informasi event Ormawa dapat diperoleh melalui website resmi Telkom University, media sosial masing-masing organisasi, portal mahasiswa, dan pengumuman di kampus.",
            },
          ],
        }

        setLandingData(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching landing data:", error)
        setLoading(false)
      }
    }

    fetchLandingData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-600 to-slate-300">


      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Selamat Datang di
            <br />
            <span className="text-red-400">Telkom University</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bergabunglah dengan berbagai organisasi kemahasiswaan dan ikuti event-event menarik untuk mengembangkan
            potensi diri dan memperluas jaringan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              Jelajahi Event
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Ormawa Events Section */}
      <section id="events" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Event Ormawa Terbaru</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ikuti berbagai kegiatan menarik yang diselenggarakan oleh organisasi kemahasiswaan Telkom University untuk
              mengembangkan skill dan networking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landingData?.ormawaEvents.slice(0, 3).map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{event.title}</CardTitle>
                  <CardDescription className="text-gray-600">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {event.organizer}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Daftar Sekarang</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ormawa Organizations Section */}
      <section id="ormawa" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organisasi Kemahasiswaan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bergabunglah dengan berbagai organisasi kemahasiswaan untuk mengembangkan potensi diri dan memperluas
              jaringan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landingData?.ormawaOrganizations.slice(0, 3).map((ormawa) => (
              <Card key={ormawa.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Image
                      src={ormawa.logo || "/placeholder.svg"}
                      alt={ormawa.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{ormawa.name}</CardTitle>
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    {ormawa.category}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 text-center">{ormawa.description}</CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {ormawa.memberCount} Anggota
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {ormawa.contactPerson}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Pelajari Lebih Lanjut</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang organisasi kemahasiswaan
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {landingData?.faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-left font-semibold text-gray-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Telkom</div>
                  <div className="text-xs text-gray-400">University</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Universitas Telkom adalah perguruan tinggi swasta yang berfokus pada teknologi, bisnis, dan seni yang
                berlokasi di Bandung, Jawa Barat.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#ormawa" className="hover:text-white">
                    Ormawa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Media
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Jl. Telekomunikasi No. 1</li>
                <li>Terusan Buah Batu, Bandung</li>
                <li>Jawa Barat 40257</li>
                <li>Indonesia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Telkom University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

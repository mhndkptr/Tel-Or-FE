"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar,  Users, ChevronRight, Phone } from "lucide-react"
import { useGetLandingPage } from "@/hooks/landing.hooks"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const {isLoading, isPending, landingPageData} = useGetLandingPage()
  const router = useRouter()
console.log("Landing Page Data:", landingPageData)
  if (isLoading || isPending) {
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
            <Link href="/event">
            <Button size="lg" className="bg-red-600 cursor-pointer hover:bg-red-700 text-white">
              Jelajahi Event
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button></Link>
            <Link href="#events">
            
            <Button size="lg" variant="outline" className="cursor-pointer border-white text-white hover:bg-white text-gray-900">
              Pelajari Lebih Lanjut
            </Button>
            </Link>
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
            {landingPageData?.latestEvents?.slice(0, 3).map((item) => (
              <Card key={item.eventId} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image}` || "/placeholder.svg"} alt={item.eventName} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{item.eventName}</CardTitle>
                  {/* <CardDescription className="text-gray-600">{item.description}</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(item.startEvent).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      "Ini diisi organizernya"
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 cursor-pointer" onClick={() => router.push(`/event/${item.eventId}`)}>Lihat Detail</Button>
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
            {landingPageData?.topOrmawa?.slice(0, 3).map((ormawa) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">MASIH ADA YANG KAMU MAU TANYA?</h2>
            <p className="text-lg text-gray-600">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang organisasi kemahasiswaan
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {landingPageData?.latestFaqs?.map((faq) => (
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

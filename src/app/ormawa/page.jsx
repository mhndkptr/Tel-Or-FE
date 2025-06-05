import Image from "next/image"
import Link from "next/link"
import { Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      

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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-200 rounded-lg overflow-hidden">
              <div className="bg-white p-4 flex justify-center">
                <Image
                  src="/cci-logo.png"
                  alt="Central Computer Improvement Logo"
                  width={200}
                  height={200}
                  className="h-40 w-auto"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Central Computer Improvement (CCI)</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet</p>
                <div className="flex justify-end">
                  <Button asChild variant="destructive" className="flex items-center gap-2">
                    <Link href={`/detail/${item}`}>
                      Detail
                      <ExternalLink size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

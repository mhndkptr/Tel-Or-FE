import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function PublicNavbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logos/logo-telkom-university.jpg"
            alt="Telkom University Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-800 hover:text-red-600 font-medium">
            Home
          </Link>
          <Link href="/ormawa" className="text-gray-800 hover:text-red-600 font-medium">
            Ormawa
          </Link>
          <Link href="/event" className="text-gray-800 hover:text-red-600 font-medium">
            Event
          </Link>
          <Link href="/faq" className="text-gray-800 hover:text-red-600 font-medium">
            FAQ
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    </header>
  );
}

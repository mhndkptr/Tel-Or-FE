"use client";
import { useEffect, useState } from "react";
import { fetch as baseFetch } from "@/utils/baseFetch";
import "@/app/globals.css";
import { TableOfContents } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const CATEGORIES = [
  { key: "umum", label: "Umum" },
  { key: "informasi", label: "Informasi Ormawa" },
  { key: "event", label: "Event & Kegiatan" },
  { key: "bantuan", label: "Bantuan & Kontak" },
];

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("umum");

  useEffect(() => {
    const getFaqs = async () => {
      try {
        const res = await baseFetch({
          url: `/faqs?category=${category}`,
          method: "GET",
        });
        setFaqItems(res.data || []);
      } catch (err) {
        setFaqItems([]);
      } finally {
        setLoading(false);
      }
    };
    getFaqs();
  }, [category]);
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Yuk, Tanya Dulu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Semua yang sering ditanyain soal organisasi kampus,
            <br />
            kami jawab di sini secara lengkap dan jelas.
          </p>
        </div>

        {/* Dekstop FAQs */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="p-6">
              <nav className="space-y-4">
                {CATEGORIES.map((cat) =>
                  category === cat.key ? (
                    <h2
                      key={cat.key}
                      className="text-xl font-bold text-red-600 mb-6 cursor-pointer"
                    >
                      {cat.label}
                    </h2>
                  ) : (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className="block text-left w-full text-gray-700 hover:text-red-600 font-medium cursor-pointer"
                    >
                      {cat.label}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="p-6">
              <div className="flex items-center mb-8">
                <TableOfContents className="w-6 h-6 text-gray-700 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {CATEGORIES.find((cat) => cat.key === category)?.label ||
                    "Pertanyaan Umum"}
                </h2>
              </div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className=" border-b-gray-200 mb-4 overflow-hidden"
                    >
                      <AccordionTrigger className="py-4 text-lg font-medium text-gray-900 cursor-pointer">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-gray-600 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </div>

        {/* Mobile FAQs */}
        <div className="md:hidden">
          <Tabs defaultValue="umum">
            <TabsList className="tabs-list flex w-full overflow-x-auto scrollbar-hide mb-6 bg-white rounded-lg p-1 gap-1">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="text-sm whitespace-nowrap flex-shrink-0 px-4 cursor-pointer"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((cat) => (
              <TabsContent key={cat.key} value={cat.key}>
                <div className="p-4">
                  <div className="flex items-center mb-6">
                    <TableOfContents className="w-6 h-6 text-gray-700 mr-3" />
                    <h2 className="text-xl font-bold text-gray-900">
                      {cat.label}
                    </h2>
                  </div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem
                          key={item.id || index}
                          value={`item-${index}`}
                          className=" border-b-gray-200 mb-4 overflow-hidden"
                        >
                          <AccordionTrigger className="py-3  text-base font-medium text-gray-900">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-3 text-gray-600 leading-relaxed text-sm">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

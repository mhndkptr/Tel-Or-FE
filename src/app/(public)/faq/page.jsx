"use client";
import { useEffect, useState } from "react";
import { fetch as baseFetch } from "@/utils/baseFetch";
import "@/app/globals.css";
import { TableOfContents } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
      <main className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--color-greyDark-900)" }}>
            Yuk, Tanya Dulu
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--color-greyLight-600)" }}>
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
                      className="text-xl font-bold mb-6 cursor-pointer"
                      style={{ color: "var(--color-red-600)" }}
                    >
                      {cat.label}
                    </h2>
                  ) : (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className="block text-left w-full font-medium cursor-pointer"
                      style={{
                        color: "var(--color-greyLight-700)",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-red-600)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-greyLight-700)")}
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
                <TableOfContents className="w-6 h-6 mr-3" style={{ color: "var(--color-greyLight-700)" }} />
                <h2 className="text-2xl font-bold" style={{ color: "var(--color-greyDark-900)" }}>
                  {CATEGORIES.find((cat) => cat.key === category)?.label || "Pertanyaan Umum"}
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
                      className="mb-4 overflow-hidden"
                      style={{
                        borderBottom: "1px solid var(--color-greyLight-200)",
                      }}
                    >
                      <AccordionTrigger
                        className="py-4 text-lg font-medium cursor-pointer"
                        style={{ color: "var(--color-greyDark-900)" }}
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent
                        className="pb-4 leading-relaxed"
                        style={{ color: "var(--color-greyLight-700)" }}
                      >
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
            <TabsList
              className="tabs-list flex w-full overflow-x-auto scrollbar-hide mb-6 rounded-lg p-1 gap-1"
              style={{ background: "var(--color-background)" }}
            >
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="text-sm whitespace-nowrap flex-shrink-0 px-4 cursor-pointer"
                  style={{
                    color: category === cat.key ? "var(--color-red-600)" : "var(--color-greyLight-700)",
                  }}
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((cat) => (
              <TabsContent key={cat.key} value={cat.key}>
                <div className="p-4">
                  <div className="flex items-center mb-6">
                    <TableOfContents className="w-6 h-6 mr-3" style={{ color: "var(--color-greyLight-700)" }} />
                    <h2 className="text-xl font-bold" style={{ color: "var(--color-greyDark-900)" }}>
                      {cat.label}
                    </h2>
                  </div>
                  {loading ? (
                    <div style={{ color: "var(--color-greyLight-600)" }}>Loading...</div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem
                          key={item.id || index}
                          value={`item-${index}`}
                          className="mb-4 overflow-hidden"
                          style={{
                            borderBottom: "1px solid var(--color-greyLight-200)",
                          }}
                        >
                          <AccordionTrigger
                            className="py-3  text-base font-medium text-gray-900"
                            style={{ color: "var(--color-greyDark-900)" }}
                          >
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent
                            className="pb-3 leading-relaxed text-sm"
                            style={{ color: "var(--color-greyLight-700)" }}
                          >
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

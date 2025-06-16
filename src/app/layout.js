import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import { ReactQueryClientProvider } from "@/components/_core/config/ReactQueryClientProvider";
import { AuthProvider } from "@/contexts/authContext";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tel-Or | Tel-U Organization",
  description:
    "A website for student in Telkom University to explore student activity unit like organization, community, laboratory, etc.",
  icons: {
    icon: {
      url: "/assets/logos/logo-telkom-university-v.png",
      type: "image/png",
    },
    shortcut: { url: "/assets/logos/logo-telkom-university-v.png", type: "image/png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <ReactQueryClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryClientProvider>
        </>
      </body>
    </html>
  );
}

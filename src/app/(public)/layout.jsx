import PublicNavbar from "@/components/_shared/navbar/PublicNavbar";

export default function PublicLayout({children}) {
    return (
        <>
            <PublicNavbar />
            {children}
        </>
    )
}
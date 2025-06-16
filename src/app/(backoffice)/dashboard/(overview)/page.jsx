import { DashboardHeader } from "@/components/_shared/header/DashboardHeader";

export default function DashboardOverviewPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <main className="md:p-5 p-3 bg-[#FCFCFC] h-full md:space-y-5 space-y-3">
        <section className="grid md:grid-cols-2 grid-cols-1 w-full h-max justify-between md:gap-5 gap-3">
          <h1>Overview Page</h1>
        </section>
      </main>
    </>
  );
}

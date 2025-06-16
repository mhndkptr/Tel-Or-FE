import { Suspense } from "react";

export default function BackofficeLayout({ children }) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}

import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header className="shrink-0 shadow" />

      <div className="grow overflow-y-scroll">
        <div className="container py-4 sm:py-6 lg:py-8">{children}</div>
      </div>
    </div>
  );
}

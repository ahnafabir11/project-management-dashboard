"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

interface ProviderPorps extends PropsWithChildren {
  // ADD OTHER PROPS IF NEEDED
}

const queryClient = new QueryClient();

export default function Provider({ children }: ProviderPorps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>{children}</AntdRegistry>
    </QueryClientProvider>
  );
}

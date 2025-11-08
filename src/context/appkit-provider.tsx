"use client";

import { wagmiAdapter, projectId, networks } from "@/config/appkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { type ReactNode, useEffect, useMemo } from "react";
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi";

const queryClient = new QueryClient();

const metadata = {
  name: "Cocoa Chain",
  description: "Plant, track, and grow your cocoa plantations.",
  url: "https://cocoachain.example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

let modalInitialized = false;

type AppKitProviderProps = {
  children: ReactNode;
  cookies: string | null;
};

export default function AppKitProvider({
  children,
  cookies,
}: AppKitProviderProps) {
  useEffect(() => {
    if (modalInitialized) {
      return;
    }

    createAppKit({
      adapters: [wagmiAdapter],
      projectId,
      networks,
      defaultNetwork: networks[0],
      metadata,
      features: {
        analytics: true,
      },
    });

    modalInitialized = true;
  }, []);

  const initialState = useMemo(
    () =>
      cookieToInitialState(
        wagmiAdapter.wagmiConfig as Config,
        cookies ?? undefined
      ),
    [cookies]
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}


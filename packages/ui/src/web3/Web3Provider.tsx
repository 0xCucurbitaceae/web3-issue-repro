"use client"

import { useMemo } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createConfig, http, WagmiProvider } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"
import { metaMask } from "wagmi/connectors"
import { safe } from "wagmi/connectors"

// @ts-ignore that we add a func to this prototype

// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function toJSON() {
  return this.toString()
}

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: true,
  //   },
  // },
})

/**
 * Provides a context for interacting with various crypto-related services and libraries.
 *
 * The `Web3Provider` component encapsulates multiple providers required for managing crypto-related
 * interactions. It includes:
 *
 * - `WagmiProvider`: For managing interactions with Ethereum wallets and contracts.
 * - `QueryClientProvider`: For managing data fetching and caching with React Query.
 * - `RainbowKitProvider`: For managing wallet connections and UI with RainbowKit.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {React.ReactElement} The rendered `CryptoProvider` component with the specified context providers.
 */
export const Web3Provider = ({
  children,
  config,
}: {
  children: React.ReactNode

  config: Omit<
    Parameters<typeof getDefaultConfig>[0],
    "projectId" | "chains"
  > & {
    chains: any
  }
}): React.ReactElement => {
  const finalConfig = useMemo(
    () =>
      createConfig({
        ssr: true,
        connectors: [injected(), metaMask(), safe()],
        transports: {
          [mainnet.id]: http(),
          [sepolia.id]: http(),
        },
        ...config,
      }),
    [config],
  )
  return (
    <WagmiProvider reconnectOnMount config={finalConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

Web3Provider.displayName = "Web3Provider"

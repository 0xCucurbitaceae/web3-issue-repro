"use client"

import { useMemo } from "react"
import {
  Chain as RainbowChains,
  getDefaultConfig,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { cookieStorage, createStorage, WagmiProvider } from "wagmi"
import { Chain } from "wagmi/chains"
import { cookieToInitialState } from "wagmi"

// @ts-ignore that we add a func to this prototype
// to avoid an error in saving bigints to localStorage
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
  theme,
  config,
  cookies,
}: {
  children: React.ReactNode
  cookies?: any
  config: Omit<
    Parameters<typeof getDefaultConfig>[0],
    "projectId" | "chains"
  > & {
    chains: [Chain | RainbowChains, ...(Chain | RainbowChains)[]]
  }
  theme?: Theme
}): React.ReactElement => {
  const finalConfig = useMemo(
    () =>
      getDefaultConfig({
        projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID as string,
        ssr: true,
        storage: createStorage({
          storage: cookieStorage,
        }),
        ...config,
      }),
    [config],
  )
  const initialState = cookieToInitialState(finalConfig, cookies)
  return (
    <WagmiProvider config={finalConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode={false} theme={theme}>
          {children}
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

Web3Provider.displayName = "Web3Provider"

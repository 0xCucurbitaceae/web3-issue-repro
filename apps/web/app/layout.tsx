import type { Metadata } from "next"
import { hardhat, mainnet, sepolia } from "wagmi/chains"
import { Web3Provider } from "@repo/ui/web3"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import "@rainbow-me/rainbowkit/styles.css"
import "./globals.css"
import "slick-carousel/slick/slick.css"
import Head from "next/head"

const chains = [
  process.env.NODE_ENV === "development" && hardhat,
  ...[mainnet],
  ...[sepolia],
]
  .filter(Boolean)
  .flat() as any

const config = {
  appName: "loomlock",
  chains: chains as any,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="prefetch"
          href="https://lock.nyc3.cdn.digitaloceanspaces.com/assets/3d/Loomlock_v6.glb"
        />
      </Head>
      <body className={`font-sans text-text`}>
        <Web3Provider config={config}>
          <ConfigProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </ConfigProvider>
        </Web3Provider>
      </body>
    </html>
  )
}

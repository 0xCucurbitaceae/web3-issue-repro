import { hardhat, mainnet, sepolia } from "wagmi/chains"
import { Web3Provider } from "@repo/ui/web3"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"

import "./globals.css"
import "slick-carousel/slick/slick.css"
import Head from "next/head"
import { injected, metaMask, safe } from "wagmi/connectors"
import { headers } from "next/headers"

const chains = [
  process.env.NODE_ENV === "development" && hardhat,
  ...[mainnet],
  ...[sepolia],
]
  .filter(Boolean)
  .flat() as any

const config = {
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
      <body className={`font-sans text-text `}>
        <Web3Provider config={config} cookie={headers().get("cookie")}>
          <ConfigProvider>
            <AntdRegistry>
              <div className="min-h-screen flex flex-col">
                <main className="grow">{children}</main>
                <footer className="flex justify-center py-5">
                  <a
                    href={`https://github.com/0xCucurbitaceae/web3-issue-repro/pull/${VERCEL_GIT_PULL_REQUEST_ID}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://img.shields.io/badge/-GitHub-%23121011?style=for-the-badge&logo=github&logoColor=white"
                      alt="GitHub"
                    />
                  </a>
                </footer>
              </div>
            </AntdRegistry>
          </ConfigProvider>
        </Web3Provider>
      </body>
    </html>
  )
}

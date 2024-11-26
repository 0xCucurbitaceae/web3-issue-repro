"use client"

import { cn } from "@repo/ui/lib"
import { Button, Menu } from "antd"
import Link from "next/link"
import { useAccount, useDisconnect } from "wagmi"

const menuItems = [
  { key: "/", label: "home", href: "/" },
  { key: "/test", label: "test", href: "/test" },
  { key: "/test2", label: "test2", href: "/test2" },
]
export const Header = ({ className }: { className?: string }) => {
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()
  return (
    <header
      className={cn(
        "sticky top-0 w-full z-20 !bg-brand/80 backdrop-blur-lg",
        className,
      )}
    >
      <div className="container flex justify-between items-center gap-4 py-1.5">
        <Link href="/" className="text-white hover:text-brand-ultralight">
          Home
        </Link>
        <div className="grow inline-flex justify-end">
          <Menu
            className="!bg-transparent"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            selectedKeys={["0"]}
            items={menuItems.map(({ href, label }) => ({
              key: href,
              label: <Link href={href}>{label}</Link>,
            }))}
          />
        </div>
        <Button onClick={() => disconnect()} disabled={!isConnected}>
          {isConnected ? "disconnect" : "not connected"}
        </Button>
      </div>
    </header>
  )
}

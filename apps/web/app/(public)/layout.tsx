import React from "react"
import { Layout } from "antd"
import { Header } from "@/shared/components/Header"

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div style={{ minHeight: "100vh", padding: 0 }} className="bg-brand-dark">
        <Header />
        <main className="text-white">{children}</main>
      </div>
    </div>
  )
}

export default PublicLayout

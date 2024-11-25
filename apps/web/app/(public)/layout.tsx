import React from "react"
import { Layout } from "antd"
import { Header } from "@/shared/components/Header"

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ minHeight: "100vh", padding: 0 }}
      className="bg-brand-dark flex flex-col grow"
    >
      <Header />
      <main className="text-white grow">{children}</main>
    </div>
  )
}

export default PublicLayout

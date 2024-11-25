import { cn } from "@repo/ui/lib"
import React from "react"
import { IsConnected } from "@/shared/IsConnected"
import { Header } from "@/shared/components/Header"

export default function TestPage() {
  return (
    <div className="grow flex flex-col items-center justify-center text-white">
      <div
        className={cn(
          "flex justify-center flex-col gap-8  z-10",
          "gap-16 md:gap-28 lg:gap-32 2xl:gap-48",
          "w-full",
        )}
      >
        <div>
          <div className="h-full w-full relative text-center flex flex-col gap-8 container">
            <div className="text-5xl">(Public)/test 2</div>
            <IsConnected />
          </div>
        </div>
      </div>
    </div>
  )
}

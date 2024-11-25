"use client"
import { Button } from "antd"
import { useAccount } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"

export const IsConnected = () => {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  return isConnected ? (
    <div>You are connected</div>
  ) : (
    <Button onClick={openConnectModal} size="large">
      Connect
    </Button>
  )
}

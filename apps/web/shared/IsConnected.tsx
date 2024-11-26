"use client"
import { Button } from "antd"
import { useAccount, useConnect } from "wagmi"

export const IsConnected = () => {
  const { isConnected } = useAccount()
  return isConnected ? <div>You are connected</div> : <WalletOptions />
}

const WalletOptions = () => {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button
      type="button"
      key={connector.uid}
      onClick={() => connect({ connector })}
    >
      {connector.name}
    </button>
  ))
}

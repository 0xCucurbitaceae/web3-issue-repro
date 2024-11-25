"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect } from "react"
import { useAccount, useBalance, useBlockNumber, useSwitchChain } from "wagmi"
import { Button, ButtonProps, message } from "antd"

export const Web3Button = ({
  bypass = false,
  bypassSwitchNetwork = false,
  disconnectedText = "connect",
  chainId,
  onClick,
  ...props
}: ButtonProps & {
  bypass?: boolean
  bypassSwitchNetwork?: boolean
  chainId?: number
  disconnectedText?: string
}) => {
  const { chains, switchChain } = useSwitchChain()

  const [messageApi, contextHolder] = message.useMessage()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { address } = useAccount()
  const balance = useBalance({
    address,
  })

  useEffect(() => {
    balance.refetch()
  }, [blockNumber, balance])
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        if (bypass) {
          return <Button {...props} />
        }

        if (!ready) {
          return (
            <div
              aria-hidden
              style={{
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <Button {...props}>{props.children}</Button>
            </div>
          )
        }

        if (!connected) {
          return (
            <Button
              htmlType="button"
              onClick={openConnectModal}
              className={props.className}
              {...props}
              disabled={false}
            >
              {disconnectedText}
            </Button>
          )
        }

        if (
          chain.unsupported ||
          (chainId && chain.id !== chainId && !bypassSwitchNetwork)
        ) {
          return (
            <Button
              {...props}
              htmlType="button"
              disabled={false}
              onClick={() => {
                const tgt = chains.find(({ id }) => id === chainId)
                if (!tgt) {
                  throw new Error("Chain not found")
                }
                if (chainId) {
                  switchChain({ chainId: chainId! })
                  return
                }
                openChainModal()
              }}
              className={props.className}
            >
              Change chain
            </Button>
          )
        }

        if (balance.data?.value === BigInt(0)) {
          return (
            <Button
              {...props}
              htmlType="button"
              onClick={(evt) => {
                evt.preventDefault()
                messageApi.open({
                  type: "error",
                  content: (
                    <span className="text-black">
                      You don't have enough ETH in your wallet to perform this
                      transaction.
                    </span>
                  ),
                })
              }}
            >
              {contextHolder}
              {props.children}
            </Button>
          )
        }

        return (
          <Button onClick={onClick} {...props}>
            {props.children || (
              <>
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ""}
              </>
            )}
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}

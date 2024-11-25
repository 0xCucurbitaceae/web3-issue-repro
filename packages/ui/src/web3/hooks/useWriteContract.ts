import { message } from "antd"
import { useCallback } from "react"
import {
  Config,
  useAccount,
  useChainId,
  useConfig,
  usePublicClient,
  UseWriteContractReturnType,
  useWriteContract as useWriteContractWagmi,
} from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"
import { hardhat } from "wagmi/chains"

// this type is needed as the hook can't infer its own type 🫠
// https://github.com/microsoft/TypeScript/issues/42873#issuecomment-2065572017
type WriteContractAsyncAbx<
  config extends Config = Config,
  context = unknown,
> = ReturnType<typeof useWriteContractWagmi> & {
  writeContractAsyncNative: UseWriteContractReturnType<
    config,
    context
  >["writeContractAsync"]
  writeContractAsync: (
    opts: Parameters<
      UseWriteContractReturnType<config, context>["writeContractAsync"]
    >[0] & {
      loading?: string
      success?: string
      error?: string
      onTxHash?: (txHash: string) => void
    },
  ) => UseWriteContractReturnType<config, context>["writeContractAsync"]
  contextHolder: any
}

const mappings = {
  OwnableUnauthorizedAccount: "You must be the owner",
}
const humanizeError = (error: any) => {
  const parsedError = /Error: (\w+)/.exec(error.message)
  if (!parsedError) {
    return
  }
  return mappings[parsedError[1] as any] || parsedError[1]
}

/**
 * This wraps the useWriteContract hook from wagmi
 * to add default toast and waiting etc.
 * You might want to add errors in the humanizeError function
 */
export const useWriteContract = (key_?: string) => {
  const { address } = useAccount()
  const { writeContractAsync: writeContractNative, ...rest } =
    useWriteContractWagmi()
  const chainId = useChainId()
  const config = useConfig()
  const publicClient = usePublicClient()

  const writeContractAsync = useCallback(
    async (
      {
        loading = "Confirm transaction",
        success = "Transaction success!",
        error = "Failed to send transaction",
        onTxHash,
        ...wagmiNative
      }: {
        loading?: string
        success?: string
        error?: string
        onTxHash?: (txHash: string) => void
      } & Parameters<typeof writeContractNative>[0],
      hooks = undefined,
    ) => {
      const key = key_ || JSON.stringify(wagmiNative)
      try {
        console.log({ writeArgs: wagmiNative })

        if (process.env.NODE_ENV === "development" && chainId === hardhat.id) {
          const nonce = await publicClient!.getTransactionCount({
            address: address!,
          })
          message.info(`Expected nonce: ${nonce}`)
        }

        message.open({
          key,
          type: "loading",
          content: "Awaiting confirmation...",
          duration: 0,
        })
        const hash = await writeContractNative(wagmiNative, hooks)
        message.open({
          key,
          type: "loading",
          content: loading,
          duration: 0,
        })
        await onTxHash?.(hash)

        const receipt = await waitForTransactionReceipt(config, {
          hash,
        })

        message.open({
          key,
          type: "success",
          content: success,
          duration: 2,
        })

        return receipt
      } catch (e: any) {
        const errorMessage = humanizeError(e)
        console.log(e.message)
        if (
          /User rejected the request/.test(e.message) ||
          /User denied transaction signature/.test(e.message)
        ) {
          message.open({
            key,
            type: "warning",
            content: "Cancelled",
            duration: 2,
          })
        } else {
          console.log("Error", e)
          message.open({
            key,
            type: "error",
            content: error || "Error sending transaction",
            duration: 2,
          })
        }
        throw errorMessage || e
      }
    },
    [chainId, writeContractNative, config, publicClient, address, key_],
  )

  return {
    ...rest,
    writeContractAsyncNative: writeContractNative,
    writeContractAsync,
  } as unknown as WriteContractAsyncAbx
}

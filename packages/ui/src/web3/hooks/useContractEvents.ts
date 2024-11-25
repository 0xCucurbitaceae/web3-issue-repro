"use client"

import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query"
import { useConfig, useWatchContractEvent } from "wagmi"
import { getPublicClient } from "wagmi/actions"
import { decodeEventLog } from "viem"

/**
 * Fetches events from the blockchain
 *
 * This exists and is implemented as SWR because wagmi's `useWatchContractEvent` doesn't do anything, `onLogs` never gets called for
 * new realtime events, so we're using a trusted solution to manage data revalidation ourselves.
 *
 * @param address
 * @param abi
 * @param eventName
 * @param chainId
 */
export const useContractEvents = ({
  address,
  abi,
  eventName,
  chainId,
  args,
  // TODO: use more sensible default value, no need to read events from 2011
  fromBlock = 0n,
  enabled,
  ...useQueryOptions
}: {
  address: `0x${string}`
  abi: any
  eventName: string
  chainId: number
  args?: any
  fromBlock?: bigint
  enabled?: boolean
  useQueryOptions?: UseQueryOptions
}) => {
  const config = useConfig()
  const client = getPublicClient(config, { chainId })
  const event = abi.find((e) => e.name === eventName && e.type === "event")
  const queryKey = [address, chainId, eventName, fromBlock]
  const queryClient = useQueryClient()
  const query = useQuery({
    enabled,
    queryKey,
    queryFn: async () => {
      const getLogs = (fromBlock_: bigint, toBlock_?: bigint) =>
        client!.getLogs({
          fromBlock: fromBlock_,
          toBlock: toBlock_,
          address,
          event,
          args,
        })

      try {
        const logs = await getLogs(fromBlock)
        return logs
      } catch (e: any) {
        console.log("Error fetching logs", { e })
        if (e.name === "InvalidParamsRpcError") {
          // Then it's likely an issue with reponse size being > 10k events
          console.log("Falling back to smaller batches")
          const currentBlock = await client!.getBlockNumber()
          // Loop through in batches of 2000, using simulataneous promises
          const batch = 2000n
          const promises = [] as any[]
          for (let i = fromBlock; i < currentBlock; i += batch) {
            promises.push(getLogs(i, i + batch))
          }
          // Concat all the logs
          return (await Promise.all(promises)).flat()
        }
      }
    },
    select: (data: any) => {
      const parsed = data.map((log: any) =>
        decodeEventLog({
          abi,
          ...log,
        }),
      )
      return parsed
    },

    ...useQueryOptions,
  })
  useWatchContractEvent({
    address,
    abi,
    eventName,
    chainId,
    args,
    onLogs(logs) {
      queryClient.setQueryData(queryKey, (data: any) => {
        return [
          ...(data || []).map((log: any) =>
            decodeEventLog({
              abi,
              ...log,
            }),
          ),
          ...logs,
        ]
      })
    },
  })

  return query
}

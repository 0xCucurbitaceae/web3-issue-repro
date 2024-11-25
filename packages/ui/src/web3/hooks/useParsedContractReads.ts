"use client"

import {
  type FunctionNameExtended,
  mapReadToObject,
} from "../utils/read-contract"
import { useEffect, useMemo } from "react"
import type { Abi } from "viem"
import { useBlockNumber, useReadContracts } from "wagmi"

/**
 * helper around useContractReads that returns a single object with the data,
 * named after the functionNames rather than as an array(like wagmi does).
 * @example
 *
 * const contracts = ["foo", { functionName: "bar", parseAs: "date" }]
 * data == {
 *  foo: 303n
 *  bar: Date
 * }
 *
 */
export function useParsedContractReads<T extends Record<string, any>>({
  contracts,
  watch,
  ...rest
}: {
  contracts: (FunctionNameExtended & {
    address: `0x${string}`
    chainId: number
    abi: Abi[]
  })[]
  watch?: boolean
  // @ts-ignore idk what's the deal with the infinite type thing but it's not an actual problem
} & Parameters<typeof useReadContracts>[0]) {
  const { data: dataRaw, ...wagmiReturn } = useReadContracts({
    allowFailure: true,
    // @ts-ignore that this will be the right
    contracts,
    ...rest,
  })

  const { data: blockNumber } = useBlockNumber({ watch })

  const { refetch } = wagmiReturn
  useEffect(() => {
    refetch()
  }, [blockNumber, refetch])

  const data = useMemo(() => {
    if (wagmiReturn.isLoading) {
      return null
    }
    return mapReadToObject<T>(
      contracts,
      // @ts-ignore
      dataRaw,
    )
  }, [contracts, dataRaw, wagmiReturn.isLoading])
  return {
    ...wagmiReturn,
    data: data as T | null,
  } as Omit<ReturnType<typeof useReadContracts>, "data"> & {
    data: T | null
  }
}

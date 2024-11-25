export type FunctionNameExtended = {
  functionName: string
  parseAs?: "number" | "date" | ((val: any) => any)
  alias?: string
  args?: any[]
}

/**
 * The way viem / wagmi returns a multicall contract read
 */
type ReadReturn<T> =
  | {
      result: undefined
      error?: string
      status: "failure"
    }
  | {
      result: T
      status: "success"
      error: undefined
    }

export type SetAsReadReturns<T> = {
  [K in keyof T]: ReadReturn<T[K]> | null
}

/**
 * map an array of contract reads to an object of the results,
 * used for a more convenient way to read multicall results.
 *
 * We allow multicall to fail(so that calling a contract v2 function on a v1 contract doesn't break the whole page).
 * when this is enabled, viem/wagmi returns every data read as `{ result, status, error }`.
 * This becomes highly impractical to write code, as you must append `?.result` to almost everything :nauseated_face:
 *
 * I made the decision to have it return the value as first degree (ie `3`, not `{ result: 3 }`), and
 * return `null` if there was an error(solidity would always return `0` or `""` so we can still distinguish).
 *
 * This might evolve, but seems to cover our current cases
 * This seems to cover our cases for now, but may need to evole:
 *  - return { __error }, and have frontend check for that?
 *  - return null if not in ABI, but smth else if there's another error?
 *
 * @example
 *
 * const a = mapReadToObject(
 *  ["foo", { functionName: "bar", parseAs: "date" }],
 *  [{ result: 1, status: "success" }, { result: 18924, status: "success"}]
 * )
 * a.foo  // 1
 * a.bar  // Date(18924)
 */
export function mapReadToObject<T>(
  functionNames: FunctionNameExtended[],
  dataRaw: ReadReturn<unknown>[],
):
  | (T & {
      __raw: any
    })
  | null {
  if (!dataRaw) {
    return null
  }
  return functionNames.reduce(
    (acc, key_, index) => {
      const key =
        typeof key_ === "string" ? key_ : key_.alias || key_.functionName
      if (dataRaw?.[index] === undefined) {
        return acc
      }
      return {
        [key]: mapSingleValue((dataRaw as any)[index], key_ as any),
        ...acc,
      }
    },
    {
      __raw: dataRaw,
    },
  ) as T & {
    __raw: any
  }
}

/**
 * Util to parse a single ReadResult to expected type
 * @param readReturn  any
 * @param readReturn.error string
 * @param readReturn.status "success" | "failure"
 * @param getter.functionName string
 * @param getter.parseAs "number" | "date" | ((val: any) => any)
 *
 * @returns the parsed value or null if there was an error
 * @example
 * mapSingleValue(
 *   { result: BigInt(10000), status: "success" },
 *   { functionName: "foo", parseAs: "number" }
 * )
 * { result: 1, status: "success" }
 */
function mapSingleValue<T>(
  readReturn: ReadReturn<T>,
  getter: {
    functionName: string
    parseAs: "number" | "date" | ((val: any) => any)
  },
) {
  try {
    const { parseAs } = getter
    const { result, error } = readReturn
    // if we read with allowFailure: true, the results are objects,
    // but we want to support allowFailure: false as well
    // in which case we can read the plain returned value
    let parsedResult = result ?? (readReturn as any)
    // null should only ever happen if the read didn't work.
    // still, we don't want to have all the rest die
    if (error) {
      console.log(
        `Couldn't read ${getter.functionName || getter}: `,
        readReturn,
      )
      return null
    }
    switch (true) {
      case typeof parseAs === "function":
        parsedResult = (parseAs as (arg) => T)(readReturn) as T
        break
      case parseAs === "number":
        // ~~if the value is uint8 it already returns a number -.-~~
        // we should be explicit ab out expecting a number
        parsedResult =
          typeof result === "number" ? result : (Number(result) as T)
        break
      case parseAs === "date":
        if (Number(result) === 0) {
          parsedResult = null as T
          return
        }
        parsedResult = new Date(Number(result) * 1000) as T
        break
      default:
    }
    return parsedResult
  } catch (err: any) {
    console.log({
      getter,
      value: readReturn,
      err,
    })
    // TODO: reportToSentry
    // requires to make sentry available to core
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `Error parsing ${getter.functionName || getter}: ${err.message}`,
      )
    }
  }
}

/**
 *
 * Util to add abi, address and chainId to an array of
 * functions: `["totalSupply", { functionName: "balanceOf", args: ["0xfoobar"] }]`
 *
 * Nice as we want to support both strings and objects as input
 *
 * @example
 *
 * const foo = wrapFnNames({
 *  abi: myABI,
 *  fnNames: ["foo", {
 *    functionName: "bar",
 *    parseAs: "number",
 *  }]}, {
 *  chainId: 1,
 *  address: "0x123",
 *  abi: [],
 * })
 *
 * foo[0].functionName // "bar"
 * foo[0].address // "0x123"
 * foo[0].abi // []
 * foo[0].chainId // 1
 */
export const wrapFnNames = (
  functionNames: readonly (FunctionNameExtended | string)[],
  {
    address,
    chainId,
    abi,
  }: {
    abi: any
    address: `0x${string}`
    chainId: number
  },
) =>
  functionNames.filter(Boolean).map((key) =>
    typeof key === "string"
      ? {
          functionName: key,
          address: address as `0x${string}`,
          abi,
          chainId,
        }
      : {
          address: address as `0x${string}`,
          abi,
          chainId,
          ...key,
        },
  )

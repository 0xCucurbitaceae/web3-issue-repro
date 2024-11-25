"use client"
import { useState, useEffect } from "react"

export function Ellipsis() {
  const [shown, setShown] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setShown((i) => ++i % 4)
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      <span className={shown <= 0 ? "invisible" : ""}>.</span>
      <span className={shown <= 1 ? "invisible" : ""}>.</span>
      <span className={shown <= 2 ? "invisible" : ""}>.</span>
    </span>
  )
}

import { useCallback, useState } from "react"

const useClipboard = (duration = 2000) => {
  const [ copied, setCopied ] = useState(false)
  const [ error, setError ] = useState<Error | null>(null)

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        setTimeout(() => setCopied(false), duration)
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Failed to copy url!"))
      }
    }, [duration])

  return { copied, error, copyToClipboard }
}

export default useClipboard
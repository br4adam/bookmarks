import { useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { WarningTriangle } from "iconoir-react"

const Error = () => {
  const { error, clearError } = useBookmarkStore(state => ({ error: state.error, clearError: state.clearError }))

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearError()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [error, clearError])

  if (!error) return null

  return (
    <div className="flex gap-2 px-4 py-2 text-sm border rounded-md animate-bounce bg-slate-900 border-slate-700">
      <WarningTriangle width={16} />
      {error}
    </div>
  )
}

export default Error
import { FormEvent, useState, useRef } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"
import { PasteClipboard } from "iconoir-react"
import { toast } from "sonner"

const AddBookmarkForm = () => {
  const { fetch: getBookmarks, add: createBookmark, loading, setSelectedTag } = useBookmarkStore(state => ({ fetch: state.fetch, add: state.add, loading: state.loading, setSelectedTag: state.setSelectedTag }))
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ url, setUrl ] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toastId = toast.loading("Loading...", { closeButton: false })
    if (!userId) return
    const response = await createBookmark(url, userId)
    if (!response.success) return toast.error(response.data, { id: toastId, closeButton: true })
    toast.success("Bookmark added successfully!", { id: toastId, closeButton: true })
    getBookmarks(userId)
    setUrl("")
    setSelectedTag("")
  }

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText()
    setUrl(clipboardText)
    inputRef.current?.focus()
  }

  return (
    <form className="flex justify-center w-full gap-2 mt-8" onSubmit={handleCreate}>
      <div className="relative w-full max-w-sm">
        <input ref={inputRef} className="w-full text-sm py-2 pl-3 pr-9 bg-transparent border rounded-md backdrop-blur-lg border-zinc-700 focus:border-zinc-500 focus:outline-none" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
        <PasteClipboard className="absolute duration-200 cursor-pointer right-3 top-2 text-zinc-700 hover:text-zinc-400" width={18} onClick={handlePaste} />
      </div>
      <Button type="submit" disabled={loading}>Add</Button>
    </form>
  )
}

export default AddBookmarkForm
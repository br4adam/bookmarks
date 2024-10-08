import { FormEvent, useState, useRef } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"
import { PasteClipboard } from "iconoir-react"
import { toast } from "sonner"
import { defaultToastStyle, successToastStyle, errorToastStyle } from "../utils/toastStyles"

const AddBookmarkForm = () => {
  const { fetch: getBookmarks, add: createBookmark, bookmarks, loading, setSelectedTag } = useBookmarkStore(state => ({ fetch: state.fetch, add: state.add, bookmarks: state.bookmarks, loading: state.loading, setSelectedTag: state.setSelectedTag }))
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ url, setUrl ] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const checkBookmarkExists = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current) inputRef.current.blur()
    const isBookmarkExist = bookmarks.some(bookmark => bookmark.url === url)
    if (isBookmarkExist) return toast.message("This website is already in your collection.", { action: {label: "Save", onClick: () => handleCreate()}, description: "Are you sure you want to save it again?", duration: 10000, ...defaultToastStyle })
    handleCreate()
  }

  const handleCreate = async () => {
    const toastId = toast.loading("Loading...", { closeButton: false, ...defaultToastStyle })
    if (!userId) return
    const response = await createBookmark(url, userId)
    if (!response.success) return toast.error(response.data, { id: toastId, closeButton: true, ...errorToastStyle })
    toast.success("Bookmark added successfully!", { id: toastId, closeButton: true, ...successToastStyle })
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
    <form className="flex justify-center w-full gap-2 mt-8" onSubmit={checkBookmarkExists}>
      <div className="relative w-full max-w-sm">
        <input ref={inputRef} className="w-full text-sm py-2 pl-3 pr-9 bg-transparent border rounded-md backdrop-blur-lg border-zinc-700 focus:border-zinc-500 focus:outline-none" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
        <PasteClipboard className="absolute duration-200 cursor-pointer right-3 top-2 text-zinc-700 hover:text-zinc-400" width={18} onClick={handlePaste} />
      </div>
      <Button type="submit" disabled={loading}>Add</Button>
    </form>
  )
}

export default AddBookmarkForm
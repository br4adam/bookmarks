import { FormEvent, useState, useRef } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { useModalStore } from "../stores/ModalStore"
import Button from "./Button"
import { PasteClipboard, ClipboardCheck, ArrowUpRight } from "iconoir-react"
import { toast } from "sonner"
import { defaultToastStyle, successToastStyle, errorToastStyle } from "../utils/toastStyles"

const AddBookmark = () => {
  const { fetch: getBookmarks, add: createBookmark, bookmarks, loading, setSelectedTag } = useBookmarkStore(state => ({ fetch: state.fetch, add: state.add, bookmarks: state.bookmarks, loading: state.loading, setSelectedTag: state.setSelectedTag }))
  const isAnyModalOpen = useModalStore(state => state.isAnyModalOpen)
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ url, setUrl ] = useState<string>("")
  const [ isPasteSuccess, setIsPasteSuccess ] = useState<boolean>(false)
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
    const trimmedUrl = url.trim()
    const encodedUrl = encodeURI(trimmedUrl)
    const response = await createBookmark(encodedUrl, userId)
    if (!response.success) {
      inputRef.current?.focus()
      return toast.error(response.data, { id: toastId, closeButton: true, ...errorToastStyle })
    }
    toast.success("Bookmark added successfully!", { id: toastId, closeButton: true, ...successToastStyle })
    getBookmarks(userId)
    window.scrollTo({ top: 0, behavior: "smooth" })
    setUrl("")
    setSelectedTag("")
  }

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText()
    const encodedUrl = encodeURI(clipboardText)
    setUrl(encodedUrl)
    inputRef.current?.focus()
    setIsPasteSuccess(true)
    setTimeout(() => { setIsPasteSuccess(false) }, 3000)
  }

  return (
    <div className={`fixed transition-all duration-300 left-0 right-0 p-2 z-50 border border-zinc-700 w-[calc(100%-24px)] sm:w-[448px] mx-auto bg-zinc-900 rounded-md flex flex-col gap-2 ${ isAnyModalOpen ? "-bottom-16" : "bottom-4" }`}>
      <form className="flex justify-center w-full gap-2" onSubmit={checkBookmarkExists}>
        <input ref={inputRef} className="w-full text-sm py-2 px-1 bg-transparent focus:outline-none" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Add url..." />
        <Button className="px-3" onClick={handlePaste} type="button">
          { isPasteSuccess ? ( <ClipboardCheck className="w-4 h-4" /> ) : ( <PasteClipboard className="w-4 h-4" /> ) }
        </Button>
        <Button type="submit" className="px-3" disabled={loading}>
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}

export default AddBookmark
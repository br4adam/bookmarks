import { useState, FormEvent, useRef } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { Check, Xmark } from "iconoir-react"
import useClickOutside from "../hooks/useClickOutside"
import { toast } from "sonner"
import { errorToastStyle } from "../utils/toastStyles"

type Props = {
  bookmark: Bookmark
}

const BookmarkTagsNew = ({ bookmark }: Props) => {
  const updateBookmark = useBookmarkStore(state => state.update)
  const session = useAuthStore(state => state.session)
  const [ editable, setEditable ] = useState<boolean>(false)
  const [ inputValue, setInputValue ] = useState<string>("")
  const [ newTags, setNewTags ] = useState<string[]>(bookmark.tags)
  const [ isKeyReleased, setIsKeyReleased ] = useState<boolean>(false)
  const userId = session?.user.id

  const tagListRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateTags = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId) return
    setEditable(false)
    setInputValue("")
    const response = await updateBookmark(bookmark.id, { ...bookmark, tags: newTags })
    if (!response.success) return toast.error(response.data, errorToastStyle)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedInput = inputValue.trim().toLowerCase()

    if ((e.key === "," || e.key === "Enter") && trimmedInput.length && !newTags.includes(trimmedInput)) {
      e.preventDefault()
      setNewTags(prev => [ ...prev, trimmedInput ])
      setInputValue("")
    }

    if (e.key === "Backspace" && !inputValue.length && newTags.length && isKeyReleased) {
      e.preventDefault()
      const tagsCopy = [ ...newTags ]
      const poppedTag = tagsCopy.pop()
      setNewTags(tagsCopy)
      setInputValue(poppedTag || "")
    }

    setIsKeyReleased(false)
  }

  const deleteTag = (index: number) => {
    setNewTags(prev => prev.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  const onKeyUp = () => setIsKeyReleased(true)

  useClickOutside(tagListRef, () => { 
    setEditable(false)
    setInputValue("")
    setNewTags(bookmark.tags)
  })

  return (
    <div onClick={() => setEditable(true)} ref={tagListRef} className="flex flex-wrap gap-2 mb-2 font-mono text-xs">
      { !bookmark.tags.length && !editable && <p className="py-1 border-b border-transparent text-zinc-500">add tags...</p> }
      { newTags.map((tag, index) => (
        <span key={tag} className="px-2 py-1 flex items-center gap-1 truncate border-b border-transparent rounded-md bg-zinc-700/50 text-zinc-400 cursor-default">
          { tag } 
          <Xmark onClick={() => deleteTag(index)} className={`cursor-pointer transition-all hover:text-zinc-200 ${editable ? "opacity-100 w-4" : "opacity-0 w-0"}`} />
        </span>
      ))}
      { editable && 
        <form onSubmit={updateTags} className="flex gap-1 m-0 p-0 w-fit">
          <input type="text" value={inputValue} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} autoFocus className="max-w-full py-1 bg-transparent focus:outline-none" style={{ width: `${inputValue.length + 1}ch` }}/>
          <button type="submit">
            <Check className="cursor-pointer text-zinc-400 hover:text-zinc-200" width={16} />
          </button>
        </form>
      }
    </div>
  )
}

export default BookmarkTagsNew
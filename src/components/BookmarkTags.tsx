import { useState, FormEvent, useRef } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { Check } from "iconoir-react"
import useClickOutside from "../hooks/useClickOutside"
import { toast } from "sonner"

type Props = {
  bookmark: Bookmark
}

const BookmarkTags = ({ bookmark }: Props) => {
  const updateBookmark = useBookmarkStore(state => state.update)
  const session = useAuthStore(state => state.session)
  const [ editable, setEditable ] = useState<boolean>(false)
  const [ newTags, setNewTags ] = useState<string>(bookmark.tags.join(", "))
  const userId = session?.user.id

  const formRef = useRef<HTMLFormElement>(null)
  useClickOutside(formRef, () => setEditable(false))

  const updateTags = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId) return
    const tagList: string[] = newTags.replace(/\s/g, "").toLowerCase().split(",").filter(tag => tag)
    const response = await updateBookmark(bookmark.id, { ...bookmark, tags: tagList })
    if (!response.success) return toast.error(response.data)
    setEditable(false)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2 font-mono text-xs" onClick={() => setEditable(true)}>
    { !bookmark.tags.length && !editable && <p className="py-1 border-b border-transparent text-zinc-500">add tags...</p> }
    { bookmark && editable 
      ? <form onSubmit={updateTags} ref={formRef} className="flex w-full gap-2">
          <input type="text" value={newTags} onChange={(e) => setNewTags(e.target.value)} autoFocus className="max-w-full py-1 bg-transparent border-b border-zinc-600 focus:outline-none" style={{ width: `${newTags.length + 1}ch` }} />
          <button type="submit">
            <Check className="transition-all cursor-pointer text-zinc-400 hover:text-zinc-200" width={16} />
          </button>
        </form>
      : bookmark.tags.map(tag => <span key={tag} className="px-2 py-1 truncate border-b border-transparent rounded-md bg-zinc-700/50 text-zinc-400">{tag}</span> )
    }
  </div>
  )
}

export default BookmarkTags
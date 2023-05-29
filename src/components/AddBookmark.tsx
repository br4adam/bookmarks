import { FormEvent, useState } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"
import { toast } from "sonner"

const AddBookmark = () => {
  const { fetch: getBookmarks, add: createBookmark, loading } = useBookmarkStore(state => ({ fetch: state.fetch, add: state.add, loading: state.loading }))
  const session = useAuthStore(state => state.session)
  const [ url, setUrl ] = useState<string>("")
  const userId = session?.user.id

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId) return
    const response = await createBookmark(url, userId)
    if (!response.success) return toast.error(response.data)
    toast.success("Bookmark added successfully!")
    getBookmarks(userId)
    setUrl("")
  }

  return (
    <form className="flex justify-center w-full gap-2" onSubmit={handleCreate}>
      <input className="w-full max-w-sm px-4 py-2 border rounded-md bg-slate-900 border-slate-700 focus:border-slate-500 focus:outline-none" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
      <Button type="submit" disabled={loading}>Add</Button>
    </form>
  )
}

export default AddBookmark
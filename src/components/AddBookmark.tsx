import { FormEvent, useState } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"

const AddBookmark = () => {
  const { fetch: getBookmarks, add: createBookmark, loading } = useBookmarkStore(state => ({ fetch: state.fetch, add: state.add, loading: state.loading }))
  const { session } = useAuthStore(state => ({ session: state.session }))
  const [ url, setUrl ] = useState<string>("")
  const userId = session?.user.id

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url || !userId) return
    await createBookmark(url, userId)
    getBookmarks(userId)
    setUrl("")
  }

  return (
    <form className="flex justify-center w-full gap-2" onSubmit={handleCreate}>
      <input className="w-2/3 max-w-sm px-4 py-2 border rounded-md bg-slate-900 border-slate-700 focus:border-slate-500 focus:outline-0" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
      <Button type="submit" disabled={loading} loading={loading}>Add</Button>
    </form>
  )
}

export default AddBookmark
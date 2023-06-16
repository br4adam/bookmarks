import { useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Bookmark from "./Bookmark"
import EmptyState from "./EmptyState"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { toast } from "sonner"

const Bookmarks = () => {
  const { bookmarks, fetch: getBookmarks, loading, selectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, fetch: state.fetch, loading: state.loading, selectedTag: state.selectedTag }))
  const session = useAuthStore(state => state.session)
  const [ parent ] = useAutoAnimate({ duration: 200 })
  const userId = session?.user.id

  const loadBookmarks = async () => {
    if (!userId) return
    const response = await getBookmarks(userId)
    if (!response.success) return toast.error(response.data)
  }

  useEffect(() => {
    loadBookmarks()
  }, [])

  if (!bookmarks.length && !loading) return <EmptyState />

  const filteredBookmarks = selectedTag ? bookmarks.filter(bookmark => bookmark.tags.includes(selectedTag)) : bookmarks
  
  return (
    <section ref={parent} className="grid w-full grid-cols-1 gap-4 h-fit md:grid-cols-2 xl:grid-cols-3">
      { filteredBookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} /> )}
    </section>
  )
}

export default Bookmarks
import { useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Bookmark from "./Bookmark"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { toast } from "sonner"

const Bookmarks = () => {
  const { bookmarks, fetch: getBookmarks, selectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, fetch: state.fetch, selectedTag: state.selectedTag }))
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

  const filteredBookmarks = selectedTag ? bookmarks.filter(bookmark => bookmark.tags.includes(selectedTag)) : bookmarks

  return (
    <section ref={parent} className="grid w-full grid-cols-1 gap-4 h-fit md:grid-cols-2 xl:grid-cols-3">
      { bookmarks && filteredBookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} /> )}
    </section>
  )
}

export default Bookmarks
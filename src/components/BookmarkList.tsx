import { useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Bookmark from "./Bookmark"
import EmptyState from "./EmptyState"
import { toast } from "sonner"
import { defaultToastStyle, errorToastStyle } from "../utils/toastStyles"

const BookmarkList = () => {
  const { bookmarks, fetch: getBookmarks, loading, selectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, fetch: state.fetch, loading: state.loading, selectedTag: state.selectedTag }))
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id

  const loadBookmarks = async () => {
    const toastId = toast.loading("Your bookmarks are on the way!", { closeButton: false, ...defaultToastStyle })
    if (!userId) return
    const response = await getBookmarks(userId)
    if (!response.success) return toast.error(response.data, { id: toastId, closeButton: true, ...errorToastStyle })
    toast.dismiss(toastId)
  }

  useEffect(() => {
    loadBookmarks()
  }, [])

  if (!bookmarks.length && !loading) return <EmptyState />

  const filteredBookmarks = selectedTag ? bookmarks.filter(bookmark => bookmark.tags.includes(selectedTag)) : bookmarks
  
  return (
    <section className="grid w-full grid-cols-1 gap-4 h-fit md:grid-cols-2 xl:grid-cols-3">
      { filteredBookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} /> )}
    </section>
  )
}

export default BookmarkList
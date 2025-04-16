import { useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Bookmark from "./Bookmark"
import EmptyState from "./EmptyState"
import { toast } from "sonner"
import { defaultToastStyle, errorToastStyle } from "../utils/toastStyles"
import dayjs from "dayjs"

const BookmarkList = () => {
  const { bookmarks, fetch: getBookmarks, loading, selectedTag, order, timePeriod } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, fetch: state.fetch, loading: state.loading, selectedTag: state.selectedTag, order: state.order, timePeriod: state.timePeriod }))
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

  const filteredByTag = selectedTag && selectedTag !== "all" ? bookmarks.filter(bookmark => bookmark.tags.includes(selectedTag)) : bookmarks
  
  const filteredByTime = filteredByTag.filter(bookmark => {
    if (timePeriod === "all") return true
    const bookmarkDate = dayjs(bookmark.created_at)
    const now = dayjs()
    if (timePeriod === "month") return bookmarkDate.isAfter(now.subtract(1, 'month'))
    if (timePeriod === "week") return bookmarkDate.isAfter(now.subtract(1, 'week'))
    return true
  })

  const sortedBookmarks = [...filteredByTime].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return order === "desc" ? dateB - dateA : dateA - dateB
  })
  
  return (
    <section className="grid w-full grid-cols-1 gap-4 h-fit md:grid-cols-2 xl:grid-cols-3">
      { sortedBookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} /> )}
    </section>
  )
}

export default BookmarkList
import { useBookmarkStore } from "../stores/BookmarkStore"
import dayjs from "dayjs"

const isBookmarkInTimePeriod = (bookmarkDate: Date, timePeriod: string): boolean => {
  if (timePeriod === "all") return true

  const now = dayjs()
  const bookmark = dayjs(bookmarkDate)

  if (timePeriod === "month") {
    return bookmark.isAfter(now.subtract(1, "month"))
  }
  if (timePeriod === "week") {
    return bookmark.isAfter(now.subtract(1, "week"))
  }
  return true
}

const createTagList = (bookmarks: Bookmark[]): Tag[] => {
  const timePeriod = useBookmarkStore.getState().timePeriod
  const filteredBookmarks = bookmarks.filter(bookmark => isBookmarkInTimePeriod(new Date(bookmark.created_at), timePeriod))

  const tagCounts = filteredBookmarks.reduce<Record<string, number>>((counts, bookmark) => {
    bookmark.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1 })
    return counts
  }, {})

  const allCount = filteredBookmarks.length
  tagCounts.all = allCount

  const tags = Object.entries(tagCounts).map(([name, count]) => ({ name, count }))

  return tags.sort((a, b) => b.count - a.count)
}

export default createTagList
import { useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import Bookmark from "./Bookmark"
import TagList from "./TagList"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const Bookmarks = () => {
  const { bookmarks, fetch: getBookmarks, selectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, fetch: state.fetch, selectedTag: state.selectedTag }))
  const { session } = useAuthStore(state => ({ session: state.session }))
  const [ parent ] = useAutoAnimate({ duration: 200 })
  const userId = session?.user.id

  useEffect(() => {
    if (!userId) return
    getBookmarks(userId)
  }, [])

  console.log(bookmarks)

  const filteredBookmarks = selectedTag 
    ? bookmarks.filter(bookmark => bookmark.tags.includes(selectedTag))
    : bookmarks

  return (
    <>
      <TagList />
      <section ref={parent} className="grid w-full grid-cols-1 gap-4 h-fit md:grid-cols-2 xl:grid-cols-3">
        { bookmarks && filteredBookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} /> )}
      </section>
    </>
  )
}

export default Bookmarks
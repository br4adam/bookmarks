import AddBookmark from "../components/AddBookmark"
import TagList from "../components/TagList"
import BookmarkList from "../components/BookmarkList"

const Bookmarks = () => {
  return (
    <>
      <AddBookmark />
      <TagList />
      <BookmarkList />
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-20" />
    </>
  )
}

export default Bookmarks
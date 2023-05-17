import { useBookmarkStore } from "../stores/BookmarkStore"
import createTagList from "../utils/createTagList"

const TagList = () => {
  const { bookmarks, selectedTag, setSelectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, selectedTag: state.selectedTag, setSelectedTag: state.setSelectedTag }))
  const tags = createTagList(bookmarks)

  if (!bookmarks.length) return null

  return (
    <div className="flex flex-wrap justify-center gap-2">
        <p key="all-bookmarks" onClick={() => setSelectedTag("")} className={`cursor-pointer ${selectedTag === "" ? "underline underline-offset-4 decoration-1" : ""}`}>all
          <span className="text-xs text-slate-500"> ({bookmarks.length})</span>
        </p>
      { tags && tags.map(tag => (
        <p key={tag.name} onClick={() => setSelectedTag(tag.name)} className={`cursor-pointer ${selectedTag === tag.name ? "underline underline-offset-4 decoration-1" : ""} hover:text-slate-300`}>#{tag.name}
          <span className="text-xs text-slate-500"> ({tag.count})</span>
        </p>
      ))}
    </div>
  )
}

export default TagList
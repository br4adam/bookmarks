import { useBookmarkStore } from "../stores/BookmarkStore"
import createTagList from "../utils/createTagList"

const TagList = () => {
  const { bookmarks, selectedTag, setSelectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, selectedTag: state.selectedTag, setSelectedTag: state.setSelectedTag }))
  const tags = createTagList(bookmarks)

  if (!bookmarks.length) return null

  return (
    <div className="flex flex-wrap justify-center gap-2">
        <p onClick={() => setSelectedTag("")} className={`cursor-pointer ${selectedTag === "" ? "underline underline-offset-4 decoration-1" : ""} hover:text-zinc-300`}>all
          <span className="text-xs text-zinc-500"> ({bookmarks.length})</span>
        </p>
      { tags && tags.map(tag => (
        <p key={tag.name} onClick={() => setSelectedTag(tag.name)} className={`cursor-pointer ${selectedTag === tag.name ? "underline underline-offset-4 decoration-1" : ""} hover:text-zinc-300`}>#{tag.name}
          <span className="text-xs text-zinc-500"> ({tag.count})</span>
        </p>
      ))}
    </div>
  )
}

export default TagList
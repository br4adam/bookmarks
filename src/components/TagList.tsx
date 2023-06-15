import { useBookmarkStore } from "../stores/BookmarkStore"
import createTagList from "../utils/createTagList"

const TagList = () => {
  const { bookmarks, selectedTag, setSelectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, selectedTag: state.selectedTag, setSelectedTag: state.setSelectedTag }))
  const tags = createTagList(bookmarks)

  if (!bookmarks.length) return null

  return (
    <div className="flex flex-wrap justify-center gap-2 text-sm animate-fade-up animate-duration-200">
        <p onClick={() => setSelectedTag("")} className={`cursor-pointer px-3 py-[2px] rounded-full border backdrop-blur-lg border-zinc-800 ${!selectedTag ? "bg-zinc-700/80" : "bg-zinc-700/30"} hover:bg-zinc-800 duration-200`}>all
          <span className="ml-1 text-xs text-zinc-500">{bookmarks.length}</span>
        </p>
      { tags && tags.map(tag => (
        <p key={tag.name} onClick={() => setSelectedTag(tag.name)} className={`cursor-pointer px-3 py-[2px] rounded-full border backdrop-blur-lg border-zinc-800 ${selectedTag === tag.name ? "bg-zinc-700/80" : "bg-zinc-700/30"} hover:bg-zinc-800 duration-200`}>{tag.name}
          <span className="ml-1 text-xs text-zinc-500">{tag.count}</span>
        </p>
      ))}
    </div>
  )
}

export default TagList
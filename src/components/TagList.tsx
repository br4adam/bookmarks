import { ReactNode } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import createTagList from "../utils/createTagList"

const TagList = () => {
  const { bookmarks, selectedTag, setSelectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, selectedTag: state.selectedTag, setSelectedTag: state.setSelectedTag }))
  const tags = createTagList(bookmarks)
  const [ parent ] = useAutoAnimate({ duration: 200 })

  if (!bookmarks.length) return null

  return (
    <div className="w-full overflow-hidden relative animate-fade-up animate-duration-200">
      <div ref={parent} className="flex overflow-x-scroll min-w-full snap-x no-scrollbar justify-start md:justify-center md:flex-wrap gap-2 h-fit">
        <Tag onClick={() => setSelectedTag("")} count={bookmarks.length} isSelected={!selectedTag}>all</Tag>
        { tags && tags.map(tag => (
          <Tag key={tag.name} onClick={() => setSelectedTag(tag.name)} count={tag.count} isSelected={selectedTag === tag.name}>{tag.name}</Tag>
        ))}
      </div>
    </div>
  )
}

type TagProps = {
  onClick: React.MouseEventHandler<HTMLParagraphElement>
  count: number
  isSelected: boolean
  children: ReactNode
}

const Tag = ({ onClick, count, isSelected, children }: TagProps) => {
  return (
    <p onClick={onClick} className={`cursor-pointer h-fit px-3 py-[2px] text-sm rounded-full border backdrop-blur-lg border-zinc-800 snap-start ${isSelected ? "bg-zinc-200 text-zinc-900" : "text-zinc-200"} hover:border-zinc-700 duration-200`}>
      {children}
      <span className={`ml-1 text-xs ${isSelected ? "text-zinc-500" : "text-zinc-500"}`}>{count}</span>
    </p>
  )
}

export default TagList
import { ReactNode } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import createTagList from "../utils/createTagList"

const TagList = () => {
  const { bookmarks, selectedTag, setSelectedTag } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, selectedTag: state.selectedTag, setSelectedTag: state.setSelectedTag }))
  const tags = createTagList(bookmarks)

  if (!bookmarks.length) return null

  return (
    <div className="w-[calc(100%+32px)] md:w-full overflow-hidden relative mt-6">
      <div className="flex overflow-x-scroll min-w-full snap-x scroll-smooth no-scrollbar justify-start md:justify-center md:flex-wrap gap-2 h-fit pl-4 py-2 md:p-0">
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
    <span onClick={onClick} className={`cursor-pointer h-fit px-3 py-[2px] text-sm text-nowrap rounded-full border border-zinc-800 snap-center ${isSelected ? "bg-zinc-200 text-zinc-950" : "bg-zinc-950 text-zinc-200"} hover:border-zinc-700 duration-200`}>
      {children}
      <span className={`ml-1 text-xs text-zinc-500`}>{count}</span>
    </span>
  )
}

export default TagList
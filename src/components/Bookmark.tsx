import { SyntheticEvent } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { Pin } from "iconoir-react"
import BookmarkTags from "./BookmarkTags"
import BookmarkOptions from "./BookmarkOptions"
import Skeleton from "./Skeleton"
import CardSpotlight from "./CardSpotlight"
import useIntersectionObserver from "../hooks/useIntersectionObserver"

type Props = {
  bookmark: Bookmark
}

const Bookmark = ({ bookmark }: Props) => {
  const loading = useBookmarkStore(state => state.loading)
  const { ref, isVisible } = useIntersectionObserver()

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "./fallback.png"
  }

  if (loading) return <Skeleton />

  return (
    <CardSpotlight className="p-0">
      <div ref={ref} className="z-10 relative aspect-[1.91/1] bg-zinc-800 rounded-t-[11px] overflow-hidden">
        { isVisible && <img className="object-cover size-full m-auto animate-fade-in" src={bookmark.image} alt={bookmark.title} loading="lazy" onError={addImageFallback} /> }
        { bookmark.pinned && <PinBadge /> }
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2">
          { isVisible && <img src={`https://icon.horse/icon/${bookmark.domain}`} alt={`${bookmark.title} icon`} className="size-4 shrink-0 rounded-sm" onError={addImageFallback} /> }
          <p className="font-medium truncate">{bookmark.title}</p>
          <BookmarkOptions bookmark={bookmark} />
        </div>
        <a href={bookmark.url} target="_blank" className="inline-block max-w-[75%] mb-2 text-sm truncate outline-none text-zinc-500">{bookmark.url}</a>
        <BookmarkTags bookmark={bookmark} />
        <p className="text-sm">{bookmark.description}</p>
      </div>
    </CardSpotlight>
  )
}

const PinBadge = () => {
  return (
    <div className="absolute top-2 right-2 size-6 flex items-center justify-center rounded-full bg-zinc-800">
      <Pin className="size-4" />
    </div>
  )
}

export default Bookmark
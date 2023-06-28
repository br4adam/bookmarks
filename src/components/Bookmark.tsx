import { SyntheticEvent } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import fallbackImage from "../assets/fallback.png"
import BookmarkTags from "./BookmarkTags"
import BookmarkDropdown from "./BookmarkDropdown"
import Skeleton from "./Skeleton"
import CardSpotlight from "./CardSpotlight"

type Props = {
  bookmark: Bookmark
}

const Bookmark = ({ bookmark }: Props) => {
  const loading = useBookmarkStore(state => state.loading)

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "./fallback.png"
  }

  if (loading) return <Skeleton />

  return (
    <CardSpotlight>
      <div className="z-10 overflow-hidden rounded-md aspect-video bg-zinc-800">
        <img className="object-cover w-full h-full m-auto" src={bookmark.image ? bookmark.image : fallbackImage} alt={bookmark.title} onError={addImageFallback} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <img src={`https://icon.horse/icon/${bookmark.domain}`} alt={`${bookmark.title} icon`} className="w-4 h-4" onError={addImageFallback} />
          <p className="font-medium truncate">{bookmark.title}</p>
        <BookmarkDropdown bookmark={bookmark} />
        </div>
        <a href={bookmark.url} target="_blank" className="inline-block max-w-[75%] mb-2 text-sm truncate outline-none text-zinc-500">{bookmark.url}</a>
        <BookmarkTags bookmark={bookmark} />
        <p className="text-sm">{bookmark.description}</p>
      </div>
    </CardSpotlight>
  )
}

export default Bookmark
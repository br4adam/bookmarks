import { useBookmarkStore } from "../stores/BookmarkStore"
import { Pin } from "iconoir-react"
import fallbackImage from "../assets/fallback.png"
import BookmarkTags from "./BookmarkTags"
import BookmarkOptions from "./BookmarkOptions"
import Skeleton from "./Skeleton"
import CardSpotlight from "./CardSpotlight"
import useProgressiveImage from "../hooks/useProgressiveImage"

type Props = {
  bookmark: Bookmark
}

const Bookmark = ({ bookmark }: Props) => {
  const loading = useBookmarkStore(state => state.loading)

  const { imageSrc, isLoading: bookmarkImageIsLoading, imageRef } = useProgressiveImage({ src: bookmark.image, fallbackSrc: fallbackImage })
  const { imageSrc: faviconSrc, isLoading: bookmarkFaviconIsLoading, imageRef: faviconRef } = useProgressiveImage({ src: `https://icon.horse/icon/${bookmark.domain}`, fallbackSrc: fallbackImage })

  if (loading) return <Skeleton />

  return (
    <CardSpotlight className="p-0">
      <div ref={imageRef as React.RefObject<HTMLDivElement>} className="z-10 relative aspect-[1.91/1] bg-zinc-800 rounded-t-[11px] overflow-hidden">
        <img className={`object-cover size-full m-auto ease-out duration-300 ${bookmarkImageIsLoading ? 'opacity-0' : 'opacity-100'}`} src={imageSrc} alt={bookmark.title} />
        { bookmark.pinned && <PinBadge /> }
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2">
          <div ref={faviconRef as React.RefObject<HTMLDivElement>} className="size-4 shrink-0">
            <img className={`size-4 duration-300 rounded-sm ${bookmarkFaviconIsLoading ? 'opacity-0' : 'opacity-100'}`} src={faviconSrc} alt={bookmark.title} />
          </div>
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
      <Pin width={16} />
    </div>
  )
}

export default Bookmark
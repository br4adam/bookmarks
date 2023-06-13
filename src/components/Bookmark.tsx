import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import fallbackImage from "../assets/fallback.png"
import clearUrl from "../utils/clearUrl"
import BookmarkTags from "./BookmarkTags"
import BookmarkDropdown from "./BookmarkDropdown"
import Skeleton from "./Skeleton"

type Props = {
  bookmark: Bookmark
}

const Bookmark = ({ bookmark }: Props) => {
  const loading = useBookmarkStore(state => state.loading)
  const [ confirm, setConfirm ] = useState<boolean>(false)
  const [ opacity, setOpacity ] = useState<number>(0)
  const [ position, setPosition ] = useState<{x: number, y: number}>({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const domain = clearUrl(bookmark.url)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfirm(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [confirm])

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "./fallback.png"
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  if (loading) return <Skeleton />

  return (
    <div className="p-[1px] rounded-xl bg-gradient-to-b shadow-lg from-zinc-700/90 to-zinc-700/30 hover:to-zinc-700/60" ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative flex flex-col h-full gap-4 p-3 bg-zinc-900 rounded-xl">
      <div className="absolute inset-0 transition-all duration-300 opacity-0 pointer-events-none rounded-xl" style={{ opacity, background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, #ffffff10, transparent)` }}>
      </div>
        <div className="z-10 overflow-hidden rounded-md aspect-video bg-zinc-800">
          <img className="object-cover w-full h-full m-auto" src={bookmark.image ? bookmark.image : fallbackImage} alt={bookmark.title} onError={addImageFallback} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <img src={`https://icon.horse/icon/${domain}`} alt={`${bookmark.title} icon`} className="w-4 h-4" onError={addImageFallback} />
            <p className="font-medium truncate">{bookmark.title}</p>
          <BookmarkDropdown bookmark={bookmark} />
          </div>
          <a href={bookmark.url} target="_blank" className="inline-block max-w-full pr-24 mb-2 text-sm truncate text-zinc-500">{bookmark.url}</a>
          <BookmarkTags bookmark={bookmark} />
          <p className="text-sm">{bookmark.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Bookmark
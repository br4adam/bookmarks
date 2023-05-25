import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { OpenInBrowser, BinMinus, Check } from "iconoir-react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import fallbackImage from "../assets/fallback.png"
import clearUrl from "../utils/clearUrl"
import BookmarkTags from "./BookmarkTags"
import Skeleton from "./Skeleton"
import { toast } from "sonner"

type Props = {
  bookmark: Bookmark
}

const Bookmark = ({ bookmark }: Props) => {
  const { delete: deleteBookmark, loading } = useBookmarkStore(state => ({ delete: state.delete, loading: state.loading }))
  const session = useAuthStore(state => state.session)
  const [ confirm, setConfirm ] = useState<boolean>(false)
  const [ opacity, setOpacity ] = useState<number>(0)
  const [ position, setPosition ] = useState<{x: number, y: number}>({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const userId = session?.user.id
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
  
  const handleDelete = async (bookmarkId: number) => {
    if (!userId) return
    const response = await deleteBookmark(bookmarkId)
    if (!response.success) return toast.error(response.data)
    toast.success("Bookmark deleted successfully!")
    setConfirm(false)
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
    <div className="p-[1px] rounded-xl bg-gradient-to-b shadow-lg from-slate-700 to-slate-800 hover:to-slate-700/50" ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative flex flex-col h-full gap-4 p-3 bg-slate-900 rounded-xl">
      <div className="absolute inset-0 transition-all duration-300 opacity-0 pointer-events-none rounded-xl" style={{ opacity, background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, #f1f5f910, transparent)` }}>
      </div>
        <div className="z-10 overflow-hidden rounded-md aspect-video bg-slate-800">
          <img className="object-cover w-full h-full m-auto" src={bookmark.image ? bookmark.image : fallbackImage} alt={bookmark.title} onError={addImageFallback} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <img src={`https://icon.horse/icon/${domain}`} alt={`${bookmark.title} icon`} className="w-4 h-4" onError={addImageFallback} />
            <p className="font-medium truncate">{bookmark.title}</p>
            <div className="flex gap-2 ml-auto">
              { confirm 
                ? <Check onClick={() => handleDelete(bookmark.id)} className="transition-all cursor-pointer hover:text-green-300" width={16} />
                : <BinMinus onClick={() => setConfirm(true)} className="cursor-pointer hover:text-slate-300" width={16} />
              }
              <a href={bookmark.url} target="_blank">
                <OpenInBrowser width={16} className="hover:text-slate-300" />
              </a>
            </div>
          </div>
          <a href={bookmark.url} target="_blank" className="inline-block mb-2 text-sm truncate text-slate-500">{bookmark.url}</a>
          <BookmarkTags bookmark={bookmark} />
          <p className="text-sm">{bookmark.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Bookmark
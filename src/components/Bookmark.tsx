import { SyntheticEvent, useEffect, useState } from "react"
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
  const { session } = useAuthStore(state => ({ session: state.session }))
  const [ confirm, setConfirm ] = useState(false)
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

  if (loading) return <Skeleton />

  return (
    <div className="p-[1px] rounded-xl bg-gradient-to-b shadow-lg from-slate-700 to-slate-800 hover:to-slate-700/50">
      <div className="flex flex-col h-full gap-4 p-3 bg-slate-900 rounded-xl">
        <div className="overflow-hidden rounded-md aspect-video bg-slate-800">
          <img className="object-cover w-full h-full m-auto" src={bookmark.image ? bookmark.image : fallbackImage} alt={bookmark.title} onError={addImageFallback} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <img src={`https://icon.horse/icon/${domain}`} alt={`${bookmark.title} icon`} className="w-4" />
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
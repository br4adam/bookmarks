import { FormEvent, useState } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { toast } from "sonner"
import isValidUrl from "../utils/isValidUrl"
import Button from "./Button"
import Modal from "./Modal"
import { successToastStyle, errorToastStyle } from "../utils/toastStyles"

type Props = {
  isThumbnailModalOpen: boolean
  closeThumbnailModal: () => void
  bookmark: Bookmark
}

const ThumbnailModal = ({ isThumbnailModalOpen, closeThumbnailModal, bookmark }: Props) => {
  const { fetch: getBookmarks, update: updateBookmark } = useBookmarkStore(state => ({ fetch: state.fetch, update: state.update }))
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ imageUrl, setImageUrl ] = useState<string>("")

  const changeThumbnail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId) return
    if (!isValidUrl(imageUrl)) return toast.error("Please insert a valid image URL!", errorToastStyle)
    const response = await updateBookmark(bookmark.id, { ...bookmark, image: imageUrl })
    if (!response.success) return toast.error(response.data, errorToastStyle)
    toast.success("Thumbnail changed successfully!", successToastStyle)
    getBookmarks(userId)
    setImageUrl("")
    closeThumbnailModal()
  }

  return (
    <Modal isOpen={isThumbnailModalOpen} closeModal={closeThumbnailModal} title="Change thumbnail">
      <p className="mt-2 text-sm text-zinc-500">{`You are going to change the thumbnail of '${bookmark.title}' bookmark. Just paste the image URL and save the changes.`}</p>
      <form onSubmit={changeThumbnail}>
        <input className="w-full text-sm py-2 px-3 mt-4 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none caret-zinc-950 text-zinc-950" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="https://" />
        <div className="flex gap-2 mt-4 text-zinc-100">
          <Button type="submit" className="bg-zinc-950 hover:bg-zinc-900">Save changes</Button>
          <Button onClick={closeThumbnailModal} className="bg-transparent text-zinc-950 hover:bg-zinc-300">Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}

export default ThumbnailModal
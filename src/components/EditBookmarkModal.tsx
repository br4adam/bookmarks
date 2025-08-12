import { FormEvent, useState, useEffect } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { showErrorToast, showSuccessToast } from "../utils/showToast"
import isValidUrl from "../utils/isValidUrl"
import Button from "./Button"
import Modal from "./Modal"

type Props = {
  isEditBookmarkModalOpen: boolean
  closeEditBookmarklModal: () => void
  bookmark: Bookmark
}

const EditBookmarkModal = ({ isEditBookmarkModalOpen, closeEditBookmarklModal, bookmark }: Props) => {
  const { fetch: getBookmarks, update: updateBookmark } = useBookmarkStore(state => ({ fetch: state.fetch, update: state.update }))
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ imageUrl, setImageUrl ] = useState<string>("")
  const [ title, setTitle ] = useState<string>("")
  const [ description, setDescription ] = useState<string>("")

  useEffect(() => {
    if (isEditBookmarkModalOpen) {
      setImageUrl(bookmark.image || "")
      setTitle(bookmark.title || "")
      setDescription(bookmark.description || "")
    }
  }, [isEditBookmarkModalOpen, bookmark])

  const updateBookmarkData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userId) return
    if (imageUrl && !isValidUrl(imageUrl)) return showErrorToast("Please insert a valid image URL!")
    if (title.length > 200) return showErrorToast("The title is too long. Please keep it under 200 characters.")
    if (description.length > 1000) return showErrorToast("The description is too long. Please keep it under 1000 characters.")

    const response = await updateBookmark(bookmark.id, { ...bookmark, image: imageUrl, title, description })
    if (!response.success) return showErrorToast(response.data)
    showSuccessToast("Bookmark updated successfully!")
    getBookmarks(userId)
    closeEditBookmarklModal()
  }

  return (
    <Modal isOpen={isEditBookmarkModalOpen} closeModal={closeEditBookmarklModal} title="Edit bookmark">
      <p className="mt-2 mb-4 text-sm text-zinc-500">Customize your bookmark's title, description and thumbnail to make it easier to find and recognize.</p>
      <form onSubmit={updateBookmarkData} className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input
            id="title"
            className="w-full text-sm py-2 px-3 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none caret-zinc-950 text-zinc-950"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            maxLength={200}
            data-autofocus
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-sm font-medium" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="w-full text-sm py-2 px-3 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none caret-zinc-950 text-zinc-950 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            maxLength={1000}
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-sm font-medium" htmlFor="thumbnail">Thumbnail URL</label>
          <input
            id="thumbnail"
            className="w-full text-sm py-2 px-3 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none caret-zinc-950 text-zinc-950"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            placeholder="https://"
          />
        </div>
        <div className="flex gap-2 text-zinc-100">
          <Button type="submit" className="bg-zinc-950 hover:bg-zinc-900">Save changes</Button>
          <Button onClick={closeEditBookmarklModal} className="bg-transparent text-zinc-950 hover:bg-zinc-300">Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditBookmarkModal
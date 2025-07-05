import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { toast } from "sonner"
import Button from "./Button"
import Modal from "./Modal"
import { errorToastStyle, successToastStyle } from "../utils/toastStyles"

type Props = {
  isDeleteModalOpen: boolean
  closeDeleteModal: () => void
  bookmark: Bookmark
}

const DeleteModal = ({ isDeleteModalOpen, closeDeleteModal, bookmark }: Props) => {
  const { delete: deleteBookmark } = useBookmarkStore(state => ({ delete: state.delete }))
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id

  const handleDelete = async (bookmarkId: number) => {
    if (!userId) return
    const response = await deleteBookmark(bookmarkId)
    if (!response.success) return toast.error(response.data, errorToastStyle)
    toast.success("Bookmark deleted successfully!", successToastStyle)
    closeDeleteModal()
  }

  return (
    <Modal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} title="Delete bookmark">
      <p className="mt-2 text-sm text-zinc-500">{`You are going to delete '${bookmark.title}' bookmark. Are you sure?`}</p>
      <div className="flex gap-2 mt-4 text-zinc-100">
        <Button onClick={() => handleDelete(bookmark.id)} className="bg-zinc-950 hover:bg-zinc-900">Yes, delete!</Button>
        <Button onClick={closeDeleteModal} className="bg-transparent text-zinc-950 hover:bg-zinc-300">No, keep it!</Button>
      </div>
    </Modal>
  )
}

export default DeleteModal
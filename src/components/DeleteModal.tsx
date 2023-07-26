import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { toast } from "sonner"
import Button from "./Button"

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
    if (!response.success) return toast.error(response.data)
    toast.success("Bookmark deleted successfully!")
  }

  return (
    <Transition appear show={isDeleteModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30 antialiased" onClose={closeDeleteModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-50 backdrop-brightness-50" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-lg bg-zinc-200 selection:bg-zinc-500/20">
                <Dialog.Title as="h3" className="text-lg font-semibold text-zinc-900">Delete bookmark</Dialog.Title>
                <p className="mt-2 text-sm text-zinc-500">{`You are going to delete '${bookmark.title}' bookmark. Are you sure?`}</p>
                <div className="flex gap-2 mt-4 text-zinc-200">
                  <Button onClick={() => handleDelete(bookmark.id)} className="bg-zinc-900 hover:bg-zinc-800">Yes, delete!</Button>
                  <Button onClick={closeDeleteModal} className="bg-transparent text-zinc-900 hover:bg-zinc-300">No, keep it!</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteModal
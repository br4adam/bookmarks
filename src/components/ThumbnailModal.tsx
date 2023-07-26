import { FormEvent, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { toast } from "sonner"
import isValidUrl from "../utils/isValidUrl"
import Button from "./Button"

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
    if (!isValidUrl(imageUrl)) return toast.error("Please insert a valid image URL!")
    const response = await updateBookmark(bookmark.id, { ...bookmark, image: imageUrl })
    if (!response.success) return toast.error(response.data)
    toast.success("Thumbnail changed successfully!")
    getBookmarks(userId)
    setImageUrl("")
  }

  return (
    <Transition appear show={isThumbnailModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30 antialiased" onClose={closeThumbnailModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-50 backdrop-brightness-50" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-lg bg-zinc-200 selection:bg-zinc-500/20">
                <Dialog.Title as="h3" className="text-lg font-semibold text-zinc-900">Change thumbnail</Dialog.Title>
                <p className="mt-2 text-sm text-zinc-500">{`You are going to change the thumbnail of '${bookmark.title}' bookmark. Just paste the image URL and save the changes.`}</p>
                <form onSubmit={changeThumbnail}>
                  <input className="w-full py-2 px-4 mt-4 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none caret-zinc-900 text-zinc-900" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="https://" />
                  <div className="flex gap-2 mt-4 text-zinc-200">
                    <Button type="submit" className="bg-zinc-900 hover:bg-zinc-800">Save changes</Button>
                    <Button onClick={closeThumbnailModal} className="bg-transparent text-zinc-900 hover:bg-zinc-300">Cancel</Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ThumbnailModal
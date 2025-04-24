import { Fragment, useState, ReactNode } from "react"
import { Menu, Transition } from "@headlessui/react"
import { BinMinusIn, Copy, Pin, PinSlash, MediaImage, RefreshDouble, Check, Sparks } from "iconoir-react"
import { toast } from "sonner"
import { defaultToastStyle, successToastStyle, errorToastStyle } from "../utils/toastStyles"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import { useModalStore } from "../stores/ModalStore"
import { Session } from "@supabase/supabase-js"
import getMetadata from "../utils/getMetadata"
import generateTags from "../utils/generateTags"
import getAvailableTags from "../utils/getAvailableTags"
import useClipboard from "../hooks/useClipboard"
import DeleteModal from "./DeleteModal"
import ThumbnailModal from "./ThumbnailModal"

type Props = {
  bookmark: Bookmark
}

const BookmarkOptions = ({ bookmark }: Props) => {
  const { fetch: getBookmarks, update: updateBookmark, bookmarks } = useBookmarkStore(state => ({ fetch: state.fetch, update: state.update, bookmarks: state.bookmarks }))
  const setModalOpen = useModalStore(state => state.setModalOpen)
  const { copyToClipboard, error, copied } = useClipboard()
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false)
  const [ isThumbnailModalOpen, setIsThumbnailModalOpen ] = useState<boolean>(false)

  const pinBookmark = async () => {
    if (!userId) return
    const response = await updateBookmark(bookmark.id, { ...bookmark, pinned: !bookmark.pinned })
    if (!response.success) return toast.error(response.data, errorToastStyle)
    if (response.data[0].pinned) toast("Bookmark pinned to the top!", defaultToastStyle)
    else toast("Bookmark unpinned!", defaultToastStyle)
    getBookmarks(userId)
  }

  const copyUrl = (url: string) => {
    copyToClipboard(url)
    if (error) return toast.error(error.message, errorToastStyle)
    toast("URL copied to clipboard!", defaultToastStyle)
  }

  const refreshMetadata = async (url: string) => {
    const toastId = toast.loading("Searching for new metadata...", { closeButton: false, ...defaultToastStyle })
    const newMetadata = await getMetadata(url)
    if (!newMetadata || !userId) return toast.error("Failed to retrieve new metadata.", { id: toastId, closeButton: true, ...errorToastStyle })
    const { title, domain, description, images } = newMetadata
    if (bookmark.title === title && bookmark.description === description && bookmark.image === images[0]) return toast.info("No new metadata found.", { id: toastId, closeButton: true, ...defaultToastStyle })
    const response = await updateBookmark(bookmark.id, { ...bookmark, title: title || domain, description, image: newMetadata.images[0] })
    if (!response.success) return toast.error(response.data, { id: toastId, closeButton: true, ...errorToastStyle })
    toast.success("Bookmark refreshed successfully!", { id: toastId, closeButton: true, ...successToastStyle })
    getBookmarks(userId)
  }

  const generateBookmarkTags = async (bookmark: Bookmark, session: Session) => {
    if (!userId) return
    const toastId = toast.loading("Crafting the perfect tags for you...", { closeButton: false, ...defaultToastStyle })
		const availableTags = getAvailableTags(bookmarks)
    const newTags = await generateTags(`${bookmark.url} ${bookmark.title} ${bookmark.description}`, availableTags, session)
    if (!newTags) return toast.error("Failed to generate tags. Please try again later.", { id: toastId, closeButton: true, ...errorToastStyle })
    const updatedBookmark = { ...bookmark, tags: newTags }
    const response = await updateBookmark(bookmark.id, updatedBookmark)
    if (!response.success) return toast.error(response.data, { id: toastId, closeButton: true, ...errorToastStyle })
    toast.success("Tags generated successfully!", { id: toastId, closeButton: true, ...successToastStyle })
  }

  const openThumbnailModal = () => {
    setIsThumbnailModalOpen(true)
    setModalOpen(true)
  }

  const closeThumbnailModal = () => {
    setIsThumbnailModalOpen(false)
    setModalOpen(false)
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setModalOpen(false)
  }

  return (
    <>
      <Menu as="div" className="relative ml-auto">
        <Menu.Button className="px-3 py-1 text-sm font-medium transition-all duration-200 border rounded-md outline-none border-zinc-700 hover:border-zinc-500 focus:border-zinc-500">
          Options
        </Menu.Button>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute z-50 p-[1px] right-0 w-44 mt-2 origin-top-right bg-zinc-200 rounded-md text-sm shadow-xl focus:outline-non will-change-transform">
            <MenuItem onClick={() => copyUrl(bookmark.url)}>
              { copied ? <Check width={16} /> : <Copy width={16} /> } Copy URL
            </MenuItem>
            <MenuItem onClick={pinBookmark}>
            { bookmark.pinned ? <PinSlash width={16} /> : <Pin width={16} /> } { bookmark.pinned ? "Unpin" : "Pin to top" }
            </MenuItem>
            <MenuItem onClick={() => refreshMetadata(bookmark.url)}>
              <RefreshDouble width={16} />Refresh metadata
            </MenuItem>
            <MenuItem onClick={() => session && generateBookmarkTags(bookmark, session)} isColorful>
              <Sparks width={16} />Generate tags
            </MenuItem>
            <MenuItem onClick={() => openThumbnailModal()}>
              <MediaImage width={16} />Change thumbnail
            </MenuItem>
            <MenuItem onClick={() => openDeleteModal()}>
              <BinMinusIn width={16} className="text-red-600" /><span className="text-red-600">Delete</span>
            </MenuItem>
          </Menu.Items>
        </Transition>
      </Menu>
      { isDeleteModalOpen && <DeleteModal isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} bookmark={bookmark} /> }
      { isThumbnailModalOpen && <ThumbnailModal isThumbnailModalOpen={isThumbnailModalOpen} closeThumbnailModal={closeThumbnailModal} bookmark={bookmark} /> }
    </>
  )
}

type MenuItemProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  isColorful?: boolean
}

const MenuItem = ({ onClick, children, isColorful }: MenuItemProps) => {
  const colorfulBg = "bg-gradient-to-r from-indigo-800 via-indigo-600 to-purple-500"

  return (
    <Menu.Item>
      {({ active }) => (
        <button onClick={onClick} className={`${active ? (isColorful ? colorfulBg : "bg-zinc-950 text-zinc-200") : "text-zinc-950"} flex gap-2 w-full items-center rounded-[5px] p-2`}>
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

export default BookmarkOptions
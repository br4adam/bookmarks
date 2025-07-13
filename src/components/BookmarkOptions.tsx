import { Fragment, useState, ReactNode } from "react"
import { Menu, Transition } from "@headlessui/react"
import { BinMinusIn, Copy, Pin, PinSlash, MediaImage, RefreshDouble, Check, Sparks } from "iconoir-react"
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
import { showSuccessToast, showErrorToast, showInfoToast, showLoadingToast } from "../utils/showToast"

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
    if (!response.success) return showErrorToast(response.data)
    if (response.data[0].pinned) showInfoToast("Bookmark pinned to the top!")
    else showInfoToast("Bookmark unpinned!")
    getBookmarks(userId)
  }

  const copyUrl = (url: string) => {
    copyToClipboard(url)
    if (error) return showErrorToast(error.message)
    showInfoToast("URL copied to clipboard!")
  }

  const refreshMetadata = async (url: string) => {
    const toastId = showLoadingToast("Searching for new metadata...")
    const newMetadata = await getMetadata(url)
    if (!newMetadata || !userId) return showErrorToast("Failed to retrieve new metadata.", { id: toastId })
    const { title, domain, description, images } = newMetadata
    if (bookmark.title === title && bookmark.description === description && bookmark.image === images[0]) return showInfoToast("No new metadata found.", { id: toastId })
    const response = await updateBookmark(bookmark.id, { ...bookmark, title: title || domain, description, image: newMetadata.images[0] })
    if (!response.success) return showErrorToast(response.data, { id: toastId })
    showSuccessToast("Bookmark refreshed successfully!", { id: toastId })
    getBookmarks(userId)
  }

  const generateBookmarkTags = async (bookmark: Bookmark, session: Session) => {
    if (!userId) return
    const toastId = showLoadingToast("Crafting the perfect tags for you...")
    const availableTags = getAvailableTags(bookmarks)
    const newTags = await generateTags(`${bookmark.url} ${bookmark.title} ${bookmark.description}`, availableTags, session)
    if (!newTags) return showErrorToast("Failed to generate tags. Please try again later.", { id: toastId })
    const updatedBookmark = { ...bookmark, tags: newTags }
    const response = await updateBookmark(bookmark.id, updatedBookmark)
    if (!response.success) return showErrorToast(response.data, { id: toastId })
    showSuccessToast("Tags generated successfully!", { id: toastId })
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
          <Menu.Items className="absolute z-50 p-[1px] right-0 w-44 mt-2 origin-top-right bg-zinc-100 rounded-md text-sm shadow-xl focus:outline-non will-change-transform">
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
        <button onClick={onClick} className={`${active ? (isColorful ? colorfulBg : "bg-zinc-950 text-zinc-100") : "text-zinc-950"} flex gap-2 w-full items-center rounded-[5px] p-2`}>
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

export default BookmarkOptions
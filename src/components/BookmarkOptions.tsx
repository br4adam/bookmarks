import { useState, ReactNode } from "react"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
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
        <MenuButton className="flex items-center gap-1 px-3 py-1 text-sm font-medium transition-all duration-200 border rounded-md outline-none border-zinc-700 hover:border-zinc-500 focus:border-zinc-500">
          Options
        </MenuButton>
        <MenuItems anchor="bottom end" transition modal={false} className="w-44 origin-top-right rounded-md bg-zinc-100 z-50 p-[1px] shadow-xl transition ease-out duration-100 [--anchor-gap:8px] focus:outline-none data-closed:scale-95 data-closed:opacity-0 antialiased">
          <DropdownMenuItem onClick={() => copyUrl(bookmark.url)}>
            { copied ? <Check width={16} /> : <Copy width={16} /> } Copy link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={pinBookmark}>
            { bookmark.pinned ? <PinSlash width={16} /> : <Pin width={16} /> } { bookmark.pinned ? "Unpin" : "Pin to top" }
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => refreshMetadata(bookmark.url)}>
            <RefreshDouble width={16} />Refresh metadata
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => session && generateBookmarkTags(bookmark, session)} isColorful>
            <Sparks width={16} />Generate tags
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openThumbnailModal()}>
            <MediaImage width={16} />Change thumbnail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDeleteModal()}>
            <BinMinusIn width={16} className="text-red-600" /><span className="text-red-600">Delete</span>
          </DropdownMenuItem>
        </MenuItems>
      </Menu>
      { isDeleteModalOpen && <DeleteModal isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} bookmark={bookmark} /> }
      { isThumbnailModalOpen && <ThumbnailModal isThumbnailModalOpen={isThumbnailModalOpen} closeThumbnailModal={closeThumbnailModal} bookmark={bookmark} /> }
    </>
  )
}

type DropdownMenuItemProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  isColorful?: boolean
}

const DropdownMenuItem = ({ onClick, children, isColorful }: DropdownMenuItemProps) => {
  const colorfulFocusClasses = "data-[focus]:bg-gradient-to-r data-[focus]:from-indigo-800 data-[focus]:via-indigo-600 data-[focus]:to-purple-500 data-[focus]:text-zinc-100"
  const focusClasses = "data-[focus]:bg-zinc-950 data-[focus]:text-zinc-100"

  return (
    <MenuItem>
      <button onClick={onClick} className={`${isColorful ? colorfulFocusClasses : focusClasses} text-zinc-950 flex gap-2 w-full text-sm items-center rounded-[5px] p-2`}>
        {children}
      </button>
    </MenuItem>
  )
}

export default BookmarkOptions
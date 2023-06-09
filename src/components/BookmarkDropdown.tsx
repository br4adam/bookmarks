import { Fragment, useState, ReactNode } from "react"
import { Menu, Transition } from "@headlessui/react"
import { OpenInBrowser, Trash, Copy, Pin } from "iconoir-react"
import { toast } from "sonner"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useAuthStore } from "../stores/AuthStore"
import useClipboard from "../hooks/useClipboard"
import DeleteModal from "./DeleteModal"

type Props = {
  bookmark: Bookmark
}

const BookmarkDropdown = ({ bookmark }: Props) => {
  const { fetch: getBookmarks, update: updateBookmark } = useBookmarkStore(state => ({ fetch: state.fetch, update: state.update }))
  const { copy } = useClipboard()
  const session = useAuthStore(state => state.session)
  const userId = session?.user.id
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)

  const openInNewTab = (url: string) => window.open(url, "_blank")

  const pinBookmark = async () => {
    if (!userId) return
    const response = await updateBookmark(bookmark.id, { ...bookmark, pinned: !bookmark.pinned })
    if (!response.success) return toast.error(response.data)
    getBookmarks(userId)
  }

  const copyUrl = (url: string) => {
    copy(url)
    toast("URL copied to clipboard!", {style: { backgroundColor: "#18181b", borderColor: "#3f3f46" }})
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Menu as="div" className="relative ml-auto">
        <Menu.Button className="px-3 py-1 text-sm font-medium transition-all duration-200 border rounded-md outline-none bg-zinc-900/20 border-zinc-700 hover:border-zinc-500 focus:border-zinc-500">
          Options
        </Menu.Button>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute p-[1px] right-0 w-40 mt-2 origin-top-right bg-zinc-200 rounded-md text-sm z-20 shadow-xl focus:outline-non will-change-transform">
            <MenuItem onClick={() => openInNewTab(bookmark.url)}>
              <OpenInBrowser width={16} strokeWidth={1.75} />Open in new tab
            </MenuItem>
            <MenuItem onClick={() => copyUrl(bookmark.url)}>
              <Copy width={16} strokeWidth={1.75} />Copy URL
            </MenuItem>
            <MenuItem onClick={pinBookmark}>
              <Pin width={16} strokeWidth={1.75} />{ bookmark.pinned ? "Unpin" : "Pin to top" }
            </MenuItem>
            <MenuItem onClick={() => setIsModalOpen(true)}>
              <Trash width={16} strokeWidth={1.75} />Delete
            </MenuItem>
          </Menu.Items>
        </Transition>
      </Menu>
      { isModalOpen && <DeleteModal isModalOpen={isModalOpen} closeModal={closeModal} bookmark={bookmark} /> }
    </>
  )
}

type MenuItemProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const MenuItem = ({ onClick, children }: MenuItemProps) => {
  return (
    <Menu.Item>
    {({ active }) => (
      <button onClick={onClick} className={`${active ? "bg-zinc-800 text-zinc-200" : "text-zinc-900"} flex gap-1 w-full items-center rounded-[5px] p-2`}>
        {children}
      </button>
    )}
  </Menu.Item>
  )
}

export default BookmarkDropdown
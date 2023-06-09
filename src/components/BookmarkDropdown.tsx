import { Fragment, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { OpenInBrowser, Trash, Copy } from "iconoir-react"
import { toast } from "sonner"
import DeleteModal from "./DeleteModal"
import useClipboard from "../hooks/useClipboard"

type Props = {
  bookmark: Bookmark
}

const BookmarkDropdown = ({ bookmark }: Props) => {
  const { copy } = useClipboard()
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)

  const openInNewTab = (url: string) => window.open(url, "_blank")

  const copyUrl = (url: string) => {
    copy(url)
    toast("URL copied to clipboard!", {style: { backgroundColor: "#04060e" }})
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Menu as="div" className="relative ml-auto">
        <Menu.Button className="px-3 py-1 text-sm font-medium transition-all duration-200 border rounded-md outline-none bg-slate-900/20 border-slate-700 hover:border-slate-500">
          Options
        </Menu.Button>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute p-[1px] right-0 w-40 mt-2 origin-top-right bg-slate-200 rounded-md text-sm z-20 shadow-xl focus:outline-none">
          <Menu.Item>
              {({ active }) => (
                <button onClick={() => openInNewTab(bookmark.url)} className={`${active ? "bg-slate-800 text-slate-200" : "text-gray-900"} flex gap-1 w-full items-center rounded-md p-2`}>
                  <OpenInBrowser width={16} strokeWidth={1.75} />Open in new tab
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={() => copyUrl(bookmark.url)} className={`${active ? "bg-slate-800 text-slate-200" : "text-gray-900"} flex gap-1 w-full items-center rounded-md p-2`}>
                  <Copy width={16} strokeWidth={1.75} />Copy URL
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={() => setIsModalOpen(true)} className={`${active ? "bg-slate-800 text-slate-200" : "text-gray-900"} flex gap-1 w-full items-center rounded-md p-2`}>
                  <Trash width={16} strokeWidth={1.75} />Delete
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      { isModalOpen && <DeleteModal isModalOpen={isModalOpen} closeModal={closeModal} bookmark={bookmark} /> }
    </>
  )
}

export default BookmarkDropdown
import { Fragment, ReactNode, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { User, LogOut, LightBulb, Download } from "iconoir-react"
import Login from "./Login"
import CommandMenu from "./CommandMenu"
import { useAuthStore } from "../stores/AuthStore"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useModalStore } from "../stores/ModalStore"
import useScrollProgess from "../hooks/useScrollProgess"
import logo from "../assets/logo.png"
import defaultProfilePicture from "../assets/profilepic.png"
import ProfileCard from "./ProfileCard"
import dayjs from "dayjs"

const Header = () => {
  const { session, logout } = useAuthStore(state => ({ session: state.session, logout: state.logout }))
  const { bookmarks } = useBookmarkStore(state => ({ bookmarks: state.bookmarks }))
  const completion = useScrollProgess()
  const setModalOpen = useModalStore(state => state.setModalOpen)
  const [ isProfileCardOpen, setIsProfileCardOpen ] = useState<boolean>(false)

  const openProfileCard = () => {
    setIsProfileCardOpen(true)
    setModalOpen(true)
  }

  const closeProfileCard = () => {
    setIsProfileCardOpen(false)
    setModalOpen(false)
  }

  const downloadBookmarks = () => {
    const allBookmarks = bookmarks.map(({ title, url, image, tags, description, domain }) => ({ title, url, image, tags, description, domain }))
    const blob = new Blob([JSON.stringify(allBookmarks, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = Object.assign(document.createElement('a'), {
      href: url,
      download: `bookmarks_${dayjs().format('YYYYMMDDHHmmss')}.json`
    })
    link.click()
    URL.revokeObjectURL(url)
  }

  const clampedCompletion = Math.min(completion, 100)

  return (
    <header className="sticky top-0 z-30 w-full py-2 border-b bg-zinc-950 border-zinc-700">
      <div className="flex items-center w-full px-4 max-w-6xl gap-2 mx-auto md:w-10/12 md:px-0">
        <img className="size-6 rounded-full" src={logo} alt="Bookmarks logo" />
        <p className="font-bold">Bookmarks</p>
        <nav className="ml-auto flex gap-4 items-center">
        { !session && <Login>Login</Login> }
        { session && (
          <>
            <CommandMenu />
            <Menu as="div" className="relative size-7">
              <Menu.Button>
                <img className="size-7 rounded-full" src={session.user.user_metadata.avatar_url || defaultProfilePicture} alt="Profile picture" />
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute z-50 p-[1px] right-0 w-48 mt-2 origin-top-right bg-zinc-100 rounded-md text-sm shadow-xl focus:outline-non will-change-transform">
                  <MenuItem onClick={openProfileCard}>
                    <User width={16} /> Profile
                  </MenuItem>
                  <MenuItem onClick={downloadBookmarks}>
                    <Download width={16} /> Download bookmarks
                  </MenuItem>
                  <MenuItem onClick={() => window.open("https://github.com/br4adam/bookmarks/issues/new", "_blank")}>
                    <LightBulb width={16} /> Request a feature
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <LogOut width={16} /> Logout
                  </MenuItem>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        )}
        </nav>
      </div>
      { session && <span className="absolute bottom-[-1px] w-full h-[1px] bg-zinc-400 duration-300" style={{ transform: `translateX(${clampedCompletion - 100}%)`}}></span> }
      { isProfileCardOpen && <ProfileCard isProfileCardOpen={isProfileCardOpen} closeProfileCard={closeProfileCard} session={session} /> }
    </header>
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
        <button onClick={onClick} className={`${active ? "bg-zinc-950 text-zinc-100" : "text-zinc-950"} flex gap-2 w-full items-center rounded-[5px] p-2`}>
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

export default Header
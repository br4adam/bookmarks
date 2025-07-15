import { ReactNode, useState } from "react"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { User, LogOut, LightBulb, Download } from "iconoir-react"
import Login from "./Login"
import CommandMenu from "./CommandMenu"
import { useAuthStore } from "../stores/AuthStore"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useModalStore } from "../stores/ModalStore"
import useScrollProgess from "../hooks/useScrollProgess"
import useScrollDirection from "../hooks/useScrollDirection"
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
  const scrollDirection = useScrollDirection('up', 54)

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

  const shouldTransform = scrollDirection === 'down' && session

  const clampedCompletion = Math.min(completion, 100)

  return (
    <header className={`sticky top-0 z-30 w-full py-2 border-b bg-zinc-950 border-zinc-700 transition-transform duration-300 ease-in-out ${ shouldTransform ? '-translate-y-[54px] pointer-events-none' : 'translate-y-0' }`}>
      <div className="flex items-center w-full max-w-6xl gap-2 px-4 mx-auto md:w-10/12 md:px-0">
        <img className="rounded-full size-6" src={logo} alt="Bookmarks logo" />
        <p className="font-semibold">Bookmarks</p>
        <nav className="flex items-center gap-4 ml-auto">
        { !session && <Login>Login</Login> }
        { session && (
          <>
            <CommandMenu />
            <Menu as="div" className="relative overflow-hidden rounded-full size-7">
              <MenuButton>
                <img className="size-7" src={session.user.user_metadata.avatar_url || defaultProfilePicture} alt="Profile picture" />
              </MenuButton>
              <MenuItems anchor="bottom end" transition modal={false} className="w-48 origin-top-right rounded-md bg-zinc-100 z-50 p-[1px] shadow-xl transition ease-out duration-100 [--anchor-gap:14px] focus:outline-none data-closed:scale-95 data-closed:opacity-0 antialiased">
                <DropdownMenuItem onClick={openProfileCard}>
                  <User width={16} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadBookmarks}>
                  <Download width={16} /> Download bookmarks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open("https://github.com/br4adam/bookmarks/issues/new", "_blank")}>
                  <LightBulb width={16} /> Request a feature
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut width={16} /> Logout
                </DropdownMenuItem>
              </MenuItems>
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

type DropdownMenuItemProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const DropdownMenuItem = ({ onClick, children }: DropdownMenuItemProps) => {
  return (
    <MenuItem>
      <button onClick={onClick} className="data-[focus]:bg-zinc-950 data-[focus]:text-zinc-100 text-zinc-950 flex gap-2 w-full text-sm items-center rounded-[5px] p-2">
        {children}
      </button>
    </MenuItem>
  )
}

export default Header
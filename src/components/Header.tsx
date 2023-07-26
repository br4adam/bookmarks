import { useState } from "react"
import Login from "./Login"
import CommandMenu from "./CommandMenu"
import { useAuthStore } from "../stores/AuthStore"
import useScrollProgess from "../hooks/useScrollProgess"
import logo from "../assets/logo.png"
import defaultProfilePicture from "../assets/profilepic.png"
import ProfileCard from "./ProfileCard"

const Header = () => {
  const session = useAuthStore(state => state.session)
  const completion = useScrollProgess()
  const [ isProfileCardOpen, setIsProfileCardOpen ] = useState<boolean>(false)
  const closeProfileCard = () => setIsProfileCardOpen(false)

  return (
    <header className="sticky top-0 z-30 w-full py-2 border-b backdrop-blur-xl backdrop-saturate-150 bg-zinc-900/40 border-zinc-700">
      <div className="flex items-center w-11/12 max-w-6xl gap-2 mx-auto md:w-10/12">
        <img className={`w-6 h-6 rounded-full ${session && "cursor-pointer"}`} src={session ? session.user.user_metadata.avatar_url || defaultProfilePicture : logo} alt="profile picture" onClick={() => setIsProfileCardOpen(prev => !prev)} /> 
        <p className="font-bold">Bookmarks</p>
        <nav className="ml-auto flex gap-2">
          { session && <CommandMenu /> }
          <Login>Login</Login>
        </nav>
      </div>
      { session && <span className="absolute bottom-[-1px] w-full h-[1px] bg-zinc-400 duration-300" style={{ transform: `translateX(${completion - 100}%)`}}></span> }
      { isProfileCardOpen && <ProfileCard isProfileCardOpen={isProfileCardOpen} closeProfileCard={closeProfileCard} session={session} /> }
    </header>
  )
}

export default Header
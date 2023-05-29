import Login from "./Login"
import { useAuthStore } from "../stores/AuthStore"
import useScrollProgess from "../hooks/useScrollProgess"

const Header = () => {
  const session = useAuthStore(state => state.session)
  const completion = useScrollProgess()

  return (
    <header className="sticky top-0 z-30 w-full py-2 border-b backdrop-blur-xl backdrop-brightness-90 bg-slate-900/40 border-slate-700">
      <div className="flex items-center justify-between w-11/12 max-w-6xl gap-2 mx-auto md:w-10/12">
        { session 
          ? <div className="flex gap-2">
              <img className="w-6 rounded-full" src={session.user.user_metadata.avatar_url} alt="" />
              <p className="truncate">Hello {session.user.user_metadata.name}!</p>
            </div>
          : <p className="font-bold">Bookmarks</p>
        }
        <Login />
      </div>
      { session && <span className="absolute bottom-[-1px] w-full h-[1px] bg-slate-400" style={{ transform: `translateX(${completion - 100}%)`}}></span> }
    </header>
  )
}

export default Header
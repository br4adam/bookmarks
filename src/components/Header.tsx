import Login from "./Login"
import { useAuthStore } from "../stores/AuthStore"

const Header = () => {
  const { session } = useAuthStore(state => ({ session: state.session }))

  return (
    <header className="sticky top-0 z-10 w-full py-2 border-b backdrop-blur-xl backdrop-brightness-90 bg-slate-900/50 border-slate-700">
      <div className="flex items-center justify-between w-11/12 max-w-6xl gap-2 mx-auto md:w-10/12">
        { session 
          ? <div className="flex gap-2">
              <img className="w-6 rounded-full" src={session?.user.user_metadata.avatar_url} alt="" />
              <p className="truncate">Hello {session?.user.user_metadata.name}!</p>
            </div>
          : <p className="font-bold">Bookmarks</p>
        }
        <Login />
      </div>
    </header>
  )
}

export default Header
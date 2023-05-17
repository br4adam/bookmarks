import { useEffect } from "react"
import supabase from "./utils/supabase"
import Header from "./components/Header"
import Headline from "./components/Headline"
import Showcase from "./components/Showcase"
import AddBookmark from "./components/AddBookmark"
import Error from "./components/Error"
import TagList from "./components/TagList"
import Bookmarks from "./components/Bookmarks"
import ScrollToTop from "./components/ScrollToTop"
import { useAuthStore } from "./stores/AuthStore"
import grid from "./assets/grid.svg"

const App = () => {
  const { session, setSession } = useAuthStore(state => ({ session: state.session, setSession: state.setSession }))

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="relative flex flex-col pb-12 text-slate-200 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700/60 to-50% to-slate-950 bg-[length:1200px_1200px] bg-top bg-no-repeat selection:bg-slate-500/30 antialiased">
      <Header />
      <main className="flex flex-col items-center md:w-5/6 w-11/12 max-w-6xl gap-8 mx-auto min-h-screen bg-[length:1200px_800px] bg-top bg-no-repeat" style={{ backgroundImage: `url(${grid})`}}>
        <Headline />
        <ScrollToTop />
        { session
          ? <>
            <AddBookmark />
            <Error />
            <TagList />
            <Bookmarks />
          </>
          : <Showcase />
        }
      </main>
    </div>
  )
}

export default App

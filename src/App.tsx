import { useEffect } from "react"
import supabase from "./utils/supabase"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Showcase from "./components/Showcase"
import AddBookmarkForm from "./components/AddBookmarkForm"
import TagList from "./components/TagList"
import Bookmarks from "./components/Bookmarks"
import ScrollToTop from "./components/ScrollToTop"
import { Toaster } from "sonner"
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
    <div className="relative flex flex-col text-zinc-200 bg-zinc-950 selection:bg-zinc-500/20 antialiased">
      <Header />
      <main className="flex flex-col items-center md:w-5/6 w-11/12 mb-24 max-w-6xl gap-8 mx-auto min-h-screen bg-[length:1200px_800px] bg-top bg-no-repeat" style={{ backgroundImage: `url(${grid})`}}>
        { session
          ? <>
              <AddBookmarkForm />
              <TagList />
              <Bookmarks />
            </>
          : <Showcase />
        }
        <ScrollToTop />
        <Toaster richColors closeButton theme="dark" position="bottom-center" />
      </main>
      <Footer />
    </div>
  )
}

export default App
import { useEffect } from "react"
import supabase from "./utils/supabase"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Showcase from "./views/Showcase"
import Bookmarks from "./views/Bookmarks"
import { Toaster } from "sonner"
import { useAuthStore } from "./stores/AuthStore"
import { useModalStore } from "./stores/ModalStore"
import grid from "./assets/grid.svg"

const App = () => {
  const { session, setSession } = useAuthStore(state => ({ session: state.session, setSession: state.setSession }))
  const isAnyModalOpen = useModalStore(state => state.isAnyModalOpen)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="relative flex flex-col min-h-screen text-zinc-200 bg-zinc-950 selection:bg-zinc-500/20 antialiased">
      <Header />
      <main className="flex flex-col items-center md:w-5/6 w-11/12 mb-24 max-w-6xl gap-8 mx-auto flex-grow bg-[length:1200px_800px] bg-top bg-no-repeat" style={{ backgroundImage: `url(${grid})`}}>
        { session ? <Bookmarks /> : <Showcase /> }
        <Toaster richColors closeButton theme="dark" visibleToasts={3} className="![--width:calc(100%-24px)] sm:![--width:448px] transition-[bottom] duration-300 !z-40" position="bottom-center" offset={{ bottom: isAnyModalOpen ? "16px" : "80px" }} mobileOffset={{ bottom: isAnyModalOpen ? "16px" : "80px" }} />
        { session && <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-20" /> }
      </main>
      { !session && <Footer /> }
    </div>
  )
}

export default App
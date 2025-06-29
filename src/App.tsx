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
      <main className="flex flex-col items-center md:w-5/6 w-full px-4 md:px-0 mb-24 max-w-6xl gap-6 md:gap-8 mx-auto flex-grow bg-[length:1200px_800px] bg-top bg-no-repeat" style={{ backgroundImage: `url(${grid})`}}>
        { session ? <Bookmarks /> : <Showcase /> }
        <Toaster richColors closeButton theme="dark" visibleToasts={3} gap={8} className="![--width:calc(100%-24px)] sm:![--width:390px] transition-[bottom] duration-300 !z-40" position="bottom-center" offset={{ bottom: isAnyModalOpen ? "16px" : "102px" }} mobileOffset={{ bottom: isAnyModalOpen ? "16px" : "102px" }} />
      </main>
      { !session && <Footer /> }
    </div>
  )
}

export default App
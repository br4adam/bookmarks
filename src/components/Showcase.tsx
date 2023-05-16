import Button from "./Button"
import browser from "../assets/browser.webp"
import { useAuthStore } from "../stores/AuthStore"

const Showcase = () => {
  const { loading, login } = useAuthStore(state => ({ loading: state.loading, login: state.login }))

  return (
    <div className="flex flex-col items-center gap-8">
      <Button onClick={login} loading={loading}>Get Started Now</Button>
      <div className="w-full p-[1px] rounded-[9px] bg-gradient-to-b from-slate-700 to-slate-950">
        <img src={browser} className="" alt="bookmarks app mockup" />
      </div>
    </div>
  )
}

export default Showcase
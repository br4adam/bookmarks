import Button from "./Button"
import browser from "../assets/browser.webp"
import { useAuthStore } from "../stores/AuthStore"
import { ArrowRight } from "iconoir-react"

const Showcase = () => {
  const { loading, login } = useAuthStore(state => ({ loading: state.loading, login: state.login }))

  return (
    <div className="flex flex-col items-center gap-8">
      <Button onClick={login} loading={loading}>Get Started Now <ArrowRight width={16} /></Button>
      <div className="w-full select-none">
        <img src={browser} alt="bookmarks app browser mockup" />
      </div>
    </div>
  )
}

export default Showcase
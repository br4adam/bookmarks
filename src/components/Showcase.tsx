import Button from "./Button"
import CardSpotlight from "./CardSpotlight"
import Features from "./Features"
import browser from "../assets/browser.webp"
import { useAuthStore } from "../stores/AuthStore"
import { ArrowRight } from "iconoir-react"

const Showcase = () => {
  const { loading, login } = useAuthStore(state => ({ loading: state.loading, login: state.login }))

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button onClick={login} loading={loading} className="animate-fade-up animate-duration-500">Get Started Now <ArrowRight width={16} /></Button>
      <CardSpotlight className="w-full mt-4 animate-fade-up animate-delay-200 animate-duration-500 aspect-[8/5]" style={{ backgroundImage: `url(${browser})`}}>
      </CardSpotlight>
      <Features />
    </div>
  )
}

export default Showcase
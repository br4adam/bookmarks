import CardSpotlight from "../components/CardSpotlight"
import Login from "../components/Login"
import Headline from "../components/Headline"
import Stepper from "../components/Stepper"
import Features from "../components/Features"
import browserDesktop from "../assets/browser-desktop.webp"
import browserMobile from "../assets/browser-mobile.webp"
import { ArrowRight } from "iconoir-react"

const Showcase = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Headline />
      <Login className="group bg-zinc-950">Get Started Now <ArrowRight width={16} className="group-hover:translate-x-1 duration-500 will-change-transform" /></Login>
      <CardSpotlight className="w-full mt-12 aspect-[160/99] hidden md:flex" style={{ backgroundImage: `url(${browserDesktop})`}} />
      <img src={browserMobile} className="w-full max-w-[376px] mt-12 md:hidden" />
      <Stepper />
      <Features />
    </div>
  )
}

export default Showcase
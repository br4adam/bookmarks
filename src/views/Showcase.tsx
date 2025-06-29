import CardSpotlight from "../components/CardSpotlight"
import Login from "../components/Login"
import Headline from "../components/Headline"
import Stepper from "../components/Stepper"
import Features from "../components/Features"
import browser from "../assets/browser.webp"
import { ArrowRight } from "iconoir-react"

const Showcase = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Headline />
      <Login className="group">Get Started Now <ArrowRight width={16} className="group-hover:translate-x-1 duration-200 will-change-transform" /></Login>
      <CardSpotlight className="w-full mt-8 aspect-[8/5]" style={{ backgroundImage: `url(${browser})`}} />
      <Stepper />
      <Features />
    </div>
  )
}

export default Showcase
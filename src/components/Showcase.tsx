import CardSpotlight from "./CardSpotlight"
import Login from "./Login"
import Features from "./Features"
import Stepper from "./Stepper"
import browser from "../assets/browser.webp"
import { ArrowRight } from "iconoir-react"

const Showcase = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Login className="animate-fade-up animate-duration-500">Get Started Now <ArrowRight width={16} /></Login>
      <CardSpotlight className="w-full mt-4 animate-fade-up animate-delay-200 animate-duration-500 aspect-[8/5]" style={{ backgroundImage: `url(${browser})`}}>
      </CardSpotlight>
      <Stepper />
      <Features />
    </div>
  )
}

export default Showcase
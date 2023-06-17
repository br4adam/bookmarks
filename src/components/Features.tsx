import CardSpotlight from "./CardSpotlight"
import bg01 from "../assets/bg01.webp"
import bg02 from "../assets/bg02.webp"
import bg03 from "../assets/bg03.webp"
import bg04 from "../assets/bg04.webp"
import { ArrowTr } from "iconoir-react"

const Features = () => {
  return (
    <section className="flex flex-col w-full gap-4 select-none sm:flex-row">
      <div className="flex flex-col gap-4 sm:w-2/3">
        <CardSpotlight className="aspect-[2/1] animate-fade-up animate-delay-500 animate-duration-500" style={{ backgroundImage: `url(${bg01})`}}>
          <span className="absolute bottom-4 left-4">All your bookmarks in one place</span>
        </CardSpotlight>
        <div className="flex gap-4">
          <CardSpotlight className="w-1/2 aspect-square animate-fade-up animate-delay-700 animate-duration-500" style={{ backgroundImage: `url(${bg03})`}}>
            <span className="absolute bottom-4 left-4">Easy tagging</span>
          </CardSpotlight>
          <CardSpotlight className="w-1/2 aspect-square animate-fade-up animate-delay-[900ms] animate-duration-500" style={{ backgroundImage: `url(${bg04})`}}>
            <div className="absolute flex gap-2 bottom-4 left-4">
              <span>GitHub</span>
              <a href="https://github.com/br4adam/bookmarks" target="_blank">
                <ArrowTr width={16} />
              </a>
            </div>
          </CardSpotlight>
        </div>
      </div>
      <CardSpotlight className="sm:w-1/3 animate-fade-up aspect-[1/2] animate-delay-[1100ms] animate-duration-500" style={{ backgroundImage: `url(${bg02})`}}>
        <span className="absolute bottom-4 left-4">Superfast search</span>
      </CardSpotlight>
    </section>
  )
}

export default Features
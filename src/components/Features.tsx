import { ReactNode } from "react"
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
        <CardSpotlight className="sm:aspect-[2/1] aspect-square animate-fade-up animate-delay-500 animate-duration-500" style={{ backgroundImage: `url(${bg01})`}}>
          <Title>All your bookmarks in one place</Title>
        </CardSpotlight>
        <div className="flex flex-col gap-4 sm:flex-row">
          <CardSpotlight className="w-full aspect-square animate-fade-up animate-delay-700 animate-duration-500" style={{ backgroundImage: `url(${bg03})`}}>
            <Title>Easy tagging</Title>
          </CardSpotlight>
          <CardSpotlight className="w-full aspect-square animate-fade-up animate-delay-[900ms] animate-duration-500" style={{ backgroundImage: `url(${bg04})`}}>
            <Title>GitHub
              <a href="https://github.com/br4adam/bookmarks" target="_blank"><ArrowTr width={16} /></a>
            </Title>
          </CardSpotlight>
        </div>
      </div>
      <CardSpotlight className="sm:w-1/3 aspect-square bg-bottom sm:aspect-auto animate-fade-up animate-delay-[1100ms] animate-duration-500" style={{ backgroundImage: `url(${bg02})`}}>
        <Title>Superfast search</Title>
      </CardSpotlight>
    </section>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <span className="absolute flex gap-2 bottom-4 left-4">
      {children}
    </span>
  )
}

export default Features
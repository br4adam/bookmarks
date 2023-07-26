import { ReactNode } from "react"
import CardSpotlight from "./CardSpotlight"
import bg01 from "../assets/bg01.webp"
import bg02 from "../assets/bg02.webp"
import bg03 from "../assets/bg03.webp"
import bg04 from "../assets/bg04.webp"
import { ArrowTr } from "iconoir-react"

const Features = () => {
  return (
    <section className="flex flex-col items-center w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] sm:bg-[length:800px_400px] bg-[length:400px_200px] bg-no-repeat bg-top from-zinc-400/10 to-60% to-transparent">
      <div className="flex flex-col items-center gap-4 my-24 animate-fade-up animate-delay-700 animate-duration-500">
        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">How it looks</span>
        <h2 className="max-w-md text-4xl font-bold text-center text-transparent md:max-w-xl md:text-5xl from-zinc-400 via-zinc-200 to-zinc-400 bg-gradient-to-r bg-clip-text">Bring harmony to your virtual library</h2>
      </div>
      <div className="flex flex-col w-full gap-4 select-none sm:flex-row">
        <div className="flex flex-col gap-4 sm:w-2/3">
          <CardSpotlight className="sm:aspect-[2/1] aspect-square animate-fade-up animate-delay-[900ms] animate-duration-500" style={{ backgroundImage: `url(${bg01})`}}>
            <Title>All your bookmarks in one place</Title>
          </CardSpotlight>
          <div className="flex flex-col gap-4 sm:flex-row">
            <CardSpotlight className="w-full aspect-square animate-fade-up animate-delay-[1100ms] animate-duration-500" style={{ backgroundImage: `url(${bg03})`}}>
              <Title>Easy tagging</Title>
            </CardSpotlight>
            <CardSpotlight className="w-full aspect-square animate-fade-up animate-delay-[1300ms] animate-duration-500" style={{ backgroundImage: `url(${bg04})`}}>
              <Title>
                <a href="https://github.com/br4adam/bookmarks" target="_blank" className="flex gap-1">GitHub <ArrowTr width={16} /></a>
              </Title>
            </CardSpotlight>
          </div>
        </div>
        <CardSpotlight className="sm:w-1/3 aspect-square bg-bottom sm:aspect-auto animate-fade-up animate-delay-[1500ms] animate-duration-500" style={{ backgroundImage: `url(${bg02})`}}>
          <Title>Superfast search</Title>
        </CardSpotlight>
      </div>
    </section>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <span className="absolute flex gap-2 font-medium bottom-4 left-4">
      {children}
    </span>
  )
}

export default Features
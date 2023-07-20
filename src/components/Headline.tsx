import Balancer from "react-wrap-balancer"
import Badge from "./Badge"

const Headline = () => {
  return (
    <div className="flex flex-col gap-6 mt-20 mb-8 text-center text-transparent from-zinc-400 via-zinc-200 to-zinc-400 bg-gradient-to-r bg-clip-text animate-fade-down animate-duration-500">
      <Badge />
      <h1 className="sm:text-6xl text-5xl font-bold md:text-7xl max-w-5xl">
        <Balancer>Say goodbye to messy bookmarks</Balancer>
      </h1>
      <p className="text-lg break-words">Organize your online life effortlessly!</p>
    </div>
  )
}

export default Headline
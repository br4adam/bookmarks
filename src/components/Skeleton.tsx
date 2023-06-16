import CardSpotlight from "./CardSpotlight"

const Skeleton = () => {
  return (
    <CardSpotlight>
      <div className="rounded-md bg-zinc-700/30 aspect-video animate-pulse"></div>
      <div className="h-10 rounded-md bg-zinc-700/30 animate-pulse"></div>
      <div className="h-6 rounded-md bg-zinc-700/30 animate-pulse"></div>
      <div className="h-8 rounded-md bg-zinc-700/30 animate-pulse"></div>
    </CardSpotlight>  
  )
}

export default Skeleton
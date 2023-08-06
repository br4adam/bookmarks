import CardSpotlight from "./CardSpotlight"

const Skeleton = () => {
  return (
    <CardSpotlight>
      <SkeletonItem className="aspect-video"/>
      <SkeletonItem className="h-10"/>
      <SkeletonItem className="h-6"/>
      <SkeletonItem className="h-8"/>
    </CardSpotlight>  
  )
}

const SkeletonItem = ({ className }: { className: string }) => {
  return (
    <div className={`rounded-md bg-zinc-700/30 animate-pulse ${className}`}></div>
  )
}

export default Skeleton
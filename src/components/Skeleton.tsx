import CardSpotlight from "./CardSpotlight"

const Skeleton = () => {
  return (
    <CardSpotlight className="min-h-80">
      <SkeletonItem className="aspect-[1.91/1]"/>
      <SkeletonItem className="h-12"/>
      <SkeletonItem className="flex-1"/>
    </CardSpotlight>
  )
}

const SkeletonItem = ({ className }: { className: string }) => {
  return (
    <div className={`rounded-md bg-zinc-700/20 animate-pulse ${className}`}></div>
  )
}

export default Skeleton
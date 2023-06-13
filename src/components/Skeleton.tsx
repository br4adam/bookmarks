const Skeleton = () => {
  return (
    <div className="p-[1px] rounded-xl bg-gradient-to-b shadow-lg from-zinc-700 to-zinc-800">
      <div className="flex flex-col h-full gap-4 p-3 bg-zinc-900 rounded-xl">
        <div className="rounded-md bg-zinc-700/30 aspect-video animate-pulse"></div>
        <div className="h-10 rounded-md bg-zinc-700/30 animate-pulse"></div>
        <div className="h-6 rounded-md bg-zinc-700/30 animate-pulse"></div>
        <div className="h-8 rounded-md bg-zinc-700/30 animate-pulse"></div>
      </div>
    </div>
  )
}

export default Skeleton
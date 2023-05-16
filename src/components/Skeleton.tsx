const Skeleton = () => {
  return (
    <div className="p-[1px] rounded-xl bg-gradient-to-b shadow-lg from-slate-700 to-slate-800">
      <div className="flex flex-col h-full gap-3 p-3 bg-slate-900 rounded-xl">
        <div className="rounded-md bg-slate-700/30 aspect-video animate-pulse"></div>
        <div className="h-10 rounded-md bg-slate-700/30 animate-pulse"></div>
        <div className="h-6 rounded-md bg-slate-700/30 animate-pulse"></div>
        <div className="h-8 rounded-md bg-slate-700/30 animate-pulse"></div>
      </div>
    </div>
  )
}

export default Skeleton
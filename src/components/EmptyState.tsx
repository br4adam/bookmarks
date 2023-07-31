import { BookmarkEmpty } from "iconoir-react"
import CardSpotlight from "./CardSpotlight"

const EmptyState = () => {
  return (
    <CardSpotlight className="w-full h-96">
      <div className="flex flex-col gap-1 items-center justify-center h-full">
        <BookmarkEmpty width="56px" height="56px" strokeWidth={0.75} />
        <p className="mt-4 font-medium">No saved bookmarks</p>
        <p className="text-sm text-zinc-500">Add your first bookmark and it will appear here.</p>
        <p className="text-sm text-zinc-500">Need help? Let us now at <a href="mailto:hello@kmarks.boo" className="underline hover:text-zinc-200 duration-200">hello@kmarks.boo</a>.</p>
      </div>
    </CardSpotlight>
  )
}

export default EmptyState
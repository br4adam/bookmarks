import { useState, useEffect, SyntheticEvent } from "react"
import { Command } from "cmdk"
import { useBookmarkStore } from "../stores/BookmarkStore"
import Button from "./Button"
import clearUrl from "../utils/clearUrl"

const CommandMenu = () => {
  const [ open, setOpen ] = useState<boolean>(false)
  const { bookmarks, loading } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, loading: state.loading }))

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "./fallback.png"
  }

  return (
    <div className="ml-auto">
    <Button onClick={() => setOpen((open) => !open)} disabled={open} >⌘K</Button>
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input placeholder="Search bookmark" />
      <Command.List>
        { loading && <Command.Loading>Loading...</Command.Loading> }
        <Command.Empty>No results found.</Command.Empty>
          { bookmarks.map(bookmark => (
            <Command.Item key={bookmark.id} value={`${bookmark.title} ${bookmark.url}`} onSelect={() => window.open(bookmark.url, "_blank")}>
              <img src={`https://icon.horse/icon/${clearUrl(bookmark.url)}`} alt={`${bookmark.title} icon`} className="w-4 h-4" onError={addImageFallback} />
              <span className="truncate">{bookmark.title}</span>
              <span className="text-xs truncate text-zinc-500">{bookmark.url}</span>
            </Command.Item>
          ))}
      </Command.List>
    </Command.Dialog>
    </div>
  )
}

export default CommandMenu
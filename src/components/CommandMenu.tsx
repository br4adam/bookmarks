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
      <Command.Input placeholder="Search by title, url or tag" />
      <Command.List>
        { loading && <Command.Loading>Loading...</Command.Loading> }
        <Command.Empty>No results found.</Command.Empty>
          { bookmarks.map(bookmark => (
            <Command.Item key={bookmark.id} value={`${bookmark.title} ${bookmark.url} ${bookmark.tags.join(" ")}`} onSelect={() => window.open(bookmark.url, "_blank")}>
              <img src={`https://icon.horse/icon/${clearUrl(bookmark.url)}`} alt={`${bookmark.title} icon`} className="w-4 h-4" onError={addImageFallback} />
              <span className="truncate">{bookmark.title}</span>
              <span className="text-xs truncate text-zinc-500">{bookmark.url}</span>
            </Command.Item>
          ))}
      </Command.List>
      <div cmdk-footer="">
        <div>
          <kbd><ArrowUp /></kbd>
          <kbd><ArrowDown /></kbd>
          <span>to navigate</span>
        </div>
        <div>
          <kbd><Enter /></kbd>
          <span>to open</span>
        </div>
        <div>
          <kbd>esc</kbd>
          <span>to close</span>
        </div>
      </div>
    </Command.Dialog>
    </div>
  )
}

const ArrowUp = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6L12 2L16 6"/><path d="M12 2V22"/></svg>
}

const ArrowDown = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 18L12 22L16 18"/><path d="M12 2V22"/></svg>
}

const Enter = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 4 15 8 19"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>
}

export default CommandMenu
import { useState, useEffect, SyntheticEvent } from "react"
import { Command } from "cmdk"
import { useBookmarkStore } from "../stores/BookmarkStore"
import Button from "./Button"

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
    <>
      <Button onClick={() => setOpen((open) => !open)} className="ml-auto" disabled={open} >⌘K</Button>
      <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu">
        <Command.Input placeholder="Search by title, url or tag" />
        <Command.List>
          { loading && <Command.Loading>Loading...</Command.Loading> }
          { !bookmarks.length && <Command.Item data-disabled={true}>You have no saved bookmarks.</Command.Item> }
          <Command.Empty>No results found.</Command.Empty>
          { bookmarks.map(bookmark => (
            <Command.Item key={bookmark.id} value={`${bookmark.title} ${bookmark.url} ${bookmark.tags.join(" ")}`} onSelect={() => window.open(bookmark.url, "_blank")}>
              <img src={`https://icon.horse/icon/${bookmark.domain}`} alt={`${bookmark.title} icon`} className="w-4 h-4" onError={addImageFallback} />
              <span className="truncate">{bookmark.title}</span>
              <span className="text-xs truncate text-zinc-500">{bookmark.url}</span>
            </Command.Item>
          ))}
        </Command.List>
        <CommandFooter />
      </Command.Dialog>
    </>
  )
}

const CommandFooter = () => {
  return (
    <div cmdk-footer="">
      <kbd><ArrowUp /></kbd>
      <kbd><ArrowDown /></kbd>
      <span>to navigate</span>
      <kbd><Enter /></kbd>
      <span>to open</span>
      <kbd>esc</kbd>
      <span>to close</span>
    </div>
  )
}

const ArrowUp = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
}

const ArrowDown = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
}

const Enter = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 9l-6 6 6 6"/><path d="M20 4v7a4 4 0 0 1-4 4H5"/></svg>
}

export default CommandMenu
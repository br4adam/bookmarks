import { useState, useEffect, SyntheticEvent } from "react"
import { Command } from "cmdk"
import { useBookmarkStore } from "../stores/BookmarkStore"
import { useModalStore } from "../stores/ModalStore"
import Button from "./Button"
import { Search } from "iconoir-react"

const CommandMenu = () => {
  const [ open, setOpen ] = useState<boolean>(false)
  const [ search, setSearch ] = useState<string>("")
  const { bookmarks, loading } = useBookmarkStore(state => ({ bookmarks: state.bookmarks, loading: state.loading }))
  const setModalOpen = useModalStore(state => state.setModalOpen)

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

  const openCommandMenu = () => {
    setModalOpen(true)
    setSearch("")
    setOpen((open) => !open)
  }

  return (
    <>
      <Button onClick={() => openCommandMenu()} className="ml-auto gap-1 md:pr-2" disabled={open}>
        <Search className="size-4"/>
        Search 
        <span className="text-xs text-zinc-500 border border-zinc-700 rounded px-1 ml-12 hidden md:block">⌘K</span>
      </Button>
      <Command.Dialog open={open} onOpenChange={(isOpen) => {setOpen(isOpen); setModalOpen(isOpen)}} label="Command Menu">
        <Command.Input placeholder="Search by title, url or tag" value={search} onValueChange={setSearch} />
        <Command.List>
          { loading && <Command.Loading>Loading...</Command.Loading> }
          { !bookmarks.length && <Command.Item data-disabled={true}>You have no saved bookmarks.</Command.Item> }
          <Command.Empty>
            <p className="mb-4">No bookmarks found</p>
            <p className="text-zinc-500 text-center text-balance mb-4">There are no results matching the keyword. Try a different term or clear the search to see all your bookmarks.</p>
            <Button onClick={() => setSearch("")}>Clear search</Button>
          </Command.Empty>
          { bookmarks.map(bookmark => (
            <Command.Item key={bookmark.id} value={`${bookmark.title} ${bookmark.url} ${bookmark.tags.join(" ")}`} onSelect={() => window.open(bookmark.url, "_blank")}>
              <img src={`https://icon.horse/icon/${bookmark.domain}`} alt={`${bookmark.title} icon`} className="size-9" onError={addImageFallback} />
              <div className="flex flex-col max-w-[calc(100%-64px)]">
                <p className="truncate">{bookmark.title}</p>
                <span className="text-xs text-zinc-500 truncate">{bookmark.url}</span>
              </div>
            </Command.Item>
          ))}
        </Command.List>
        <CommandMenuFooter />
      </Command.Dialog>
    </>
  )
}

const footerShortcuts = [
  { kbd: ["↑", "↓"], label: "to navigate" },
  { kbd: ["↩"], label: "to open" },
  { kbd: ["esc"], label: "to close" }
]

const CommandMenuFooter = () => (
  <div cmdk-footer="">
    { footerShortcuts.map((shortcut, index) => (
      <span key={index} className="flex items-center gap-1">
        { shortcut.kbd.map((kbd, kbdIndex) => <kbd key={kbdIndex}>{kbd}</kbd>) }
        <span>{shortcut.label}</span>
      </span>
    )) }
  </div>
)

export default CommandMenu
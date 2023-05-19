import { create } from "zustand"
import supabase from "../utils/supabase"
import getMetadata from "../utils/getMetadata"

type BookmarkState = {
  bookmarks: Bookmark[]
  setBookmarks: (bookmarks: Bookmark[]) => void
  loading: boolean
  fetch: (userId: string) => Promise<StoreResponse<Bookmark[]>>
  add: (url: string, savedBy: string) => Promise<StoreResponse<Bookmark>>
  delete: (bookmarkId: number) => Promise<StoreResponse<Bookmark>>
  update: (bookmarkId: number, tags: string[]) => Promise<StoreResponse<Bookmark>>
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

export const useBookmarkStore = create<BookmarkState>(set => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),
  loading: false,
  fetch: async (userId) => {
    try {
      set({ loading: true })
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("saved_by", userId)
        .order("created_at", { ascending: false } )
      if (error) throw new Error(`Error fetching bookmarks: ${error.message}`)
      set({ bookmarks: data as Bookmark[] })
      return { data, success: true }
    } catch (error) {
      set({ bookmarks: [] })
      if (error instanceof Error) return { data: error.message, success: false }
      return { data: error, success: false }
    } finally {
      set({ loading: false })
    }
  },
  add: async (url, userId) => {
    if (!url) return { data: "Please enter a URL!", success: false }
    if (!/^(http|https):\/\//.test(url)) return { data: "Please include 'https://' before the URL!", success: false }
    try {
      set({ loading: true })
      const metadata = await getMetadata(url.toLowerCase())
      if (!metadata) return { data: "Please enter a valid URL!", success: false }
      const { data, error } = await supabase
        .from("bookmarks")
        .insert([{ title: metadata.title, url: metadata.url, description: metadata.description, image: metadata.images[0], saved_by: userId, tags: [] }])
        .select()
        if (error) throw new Error(`Error saving bookmark: ${error.message}`)
        return { data, success: true }
    } catch (error) {
      if (error instanceof Error) return { data: error.message, success: false }
      return { data: error, success: false }
    } finally {
      set({ loading: false })
    }
  },
  delete: async (bookmarkId) => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", bookmarkId)
        .select()
      if (error) throw new Error(`Error deleting bookmark: ${error.message}`)
      set((state) => ({ bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId ) }))
      return { data, success: true }
    } catch (error) {
      if (error instanceof Error) return { data: error.message, success: false }
      return { data: error, success: false }
    } finally {
      set({ loading: false })
    }
  },
  update: async (bookmarkId, tags) => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .update({ tags: tags })
        .eq("id", bookmarkId)
        .select()
      if (error) throw new Error(`Error updating bookmark: ${error.message}`)
      set((state) => ({
        bookmarks: state.bookmarks.map(bookmark =>
          bookmark.id === bookmarkId ? { ...bookmark, tags: tags } : bookmark
        )
      }))
      return { data, success: true }
    } catch (error) {
      if (error instanceof Error) return { data: error.message, success: false }
      return { data: error, success: false }
    } finally {
      set({ loading: false })
    }
  },
  selectedTag: "",
  setSelectedTag: (tag) => set({ selectedTag: tag})
}))
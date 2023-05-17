import { create } from "zustand"
import supabase from "../utils/supabase"
import getMetadata from "../utils/getMetadata"

type BookmarkState = {
  bookmarks: Bookmark[]
  setBookmarks: (bookmarks: Bookmark[]) => void
  loading: boolean
  error: string | null
  clearError: () => void
  fetch: (userId: string) => Promise<void>
  add: (url: string, savedBy: string) => Promise<void>
  delete: (bookmarkId: number) => Promise<void>
  update: (bookmarkId: number, tags: string[]) => Promise<void>
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

export const useBookmarkStore = create<BookmarkState>(set => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),
  loading: false,
  error: null,
  clearError: () => set({ error: null }),
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
    } catch (error) {
      if (error instanceof Error) set({ error: error.message })
      else set({ error: "Something went wrong." })
    } finally {
      set({ loading: false })
    }
  },
  add: async (url, userId) => {
    try {
      set({ loading: true })
      const metadata = await getMetadata(url.toLowerCase())
      if (!metadata) return set({ error: "Please enter a valid url." })
      const { error } = await supabase
        .from("bookmarks")
        .insert([{ title: metadata.title, url: metadata.url, description: metadata.description, image: metadata.images[0], saved_by: userId, tags: [] }])
        if (error) throw new Error(`Error saving bookmark: ${error.message}`)
    } catch (error) {
      if (error instanceof Error) set({ error: error.message })
      else set({ error: "Something went wrong." })
    } finally {
      set({ loading: false })
    }
  },
  delete: async (bookmarkId) => {
    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", bookmarkId)
      if (error) throw new Error(`Error deleting bookmark: ${error.message}`)
    } catch (error) {
      if (error instanceof Error) set({ error: error.message })
      else set({ error: "Something went wrong." })
    } finally {
      set({ loading: false })
    }
  },
  update: async (bookmarkId, tags) => {
    try {
      const { error } = await supabase
        .from("bookmarks")
        .update({ tags: tags })
        .eq("id", bookmarkId)
      if (error) throw new Error(`Error updating bookmark: ${error.message}`)
    } catch (error) {
      if (error instanceof Error) set({ error: error.message })
      else set({ error: "Something went wrong." })
    } finally {
      set({ loading: false })
    }
  },
  selectedTag: "",
  setSelectedTag: (tag) => set({ selectedTag: tag})
}))
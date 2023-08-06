import { create } from "zustand"
import supabase from "../utils/supabase"
import getMetadata from "../utils/getMetadata"
import isValidUrl from "../utils/isValidUrl"

type BookmarkState = {
  bookmarks: Bookmark[]
  loading: boolean
  fetch: (userId: string) => Promise<StoreResponse>
  add: (url: string, savedBy: string) => Promise<StoreResponse>
  delete: (bookmarkId: number) => Promise<StoreResponse>
  update: (bookmarkId: number, updatedBookmark: Bookmark) => Promise<StoreResponse>
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

export const useBookmarkStore = create<BookmarkState>(set => ({
  bookmarks: [],
  loading: false,
  fetch: async (userId) => {
    try {
      set({ loading: true })
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("saved_by", userId)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .returns<Bookmark[]>()
      if (error) throw new Error(`Error fetching bookmarks: ${error.message}`)
      set({ bookmarks: data })
      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong."
      return { data: errorMessage, success: false }
    } finally {
      set({ loading: false })
    }
  },
  add: async (url, userId) => {
    if (!url) return { data: "Please insert a URL!", success: false }
    if (!isValidUrl(url)) return { data: "Please include 'https://' in the URL!", success: false }
    try {
      set({ loading: true })
      const metadata = await getMetadata(url)
      if (!metadata) return { data: "Please insert a valid URL!", success: false }
      const { data, error } = await supabase
        .from("bookmarks")
        .insert({ title: metadata.title || metadata.domain, domain: metadata.domain, url: metadata.url, description: metadata.description, image: metadata.images[0], saved_by: userId, tags: [] })
        .select()
        .returns<Bookmark[]>()
      if (error) throw new Error(`Error saving bookmark: ${error.message}`)
      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong."
      return { data: errorMessage, success: false }
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
        .returns<Bookmark[]>()
      if (error) throw new Error(`Error deleting bookmark: ${error.message}`)
      set((state) => ({ 
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId ) 
      }))
      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong."
      return { data: errorMessage, success: false }
    }
  },
  update: async (bookmarkId, updatedBookmark) => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .update(updatedBookmark)
        .eq("id", bookmarkId)
        .select()
        .returns<Bookmark[]>()
      if (error) throw new Error(`Error updating bookmark: ${error.message}`)
      set((state) => ({
        bookmarks: state.bookmarks.map(bookmark => bookmark.id === bookmarkId ? updatedBookmark : bookmark)
      }))
      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong."
      return { data: errorMessage, success: false }
    }
  },
  selectedTag: "",
  setSelectedTag: (tag) => set({ selectedTag: tag })
}))
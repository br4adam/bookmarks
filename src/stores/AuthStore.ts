import { create } from "zustand"
import supabase from "../utils/supabase"
import { Session } from "@supabase/supabase-js"

type AuthState = {
  session: Session | null
  setSession: (session: Session | null) => void
  loading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  session: null,
  setSession: (session) => set({ session }),
  loading: false,
  error: null,
  login: async () => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" })
      if (error) throw error
      const { data: { session }} = await supabase.auth.getSession()
      set({ session: session })
    } catch (error) {
      if (error instanceof Error) set({ error: error.message })
      else set({ error: "Something went wrong." })
    } finally {
      set({ loading: false })
    }
  },
  logout: async () => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ session: null })
    } catch (error) {
      if (error instanceof Error) set({ error: error.message })
      else set({ error: "Something went wrong." })
    } finally {
      set({ loading: false })
    }
  }
}))
import { create } from "zustand"
import supabase from "../utils/supabase"
import { Session } from "@supabase/supabase-js"

type AuthState = {
  session: Session | null
  setSession: (session: Session | null) => void
  loading: boolean
  loginWithGithub: () => Promise<void>
  loginWithOtp: (email: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  session: null,
  setSession: (session) => set({ session }),
  loading: false,
  loginWithGithub: async () => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: "github", 
        options: { redirectTo: window.location.origin }
      })
      if (error) throw error
      const { data: { session }} = await supabase.auth.getSession()
      set({ session: session })
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },
  loginWithOtp: async (email) => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      const { data: { session }} = await supabase.auth.getSession()
      set({ session: session })
    } catch (error) {
      console.log(error)
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
      console.log(error)
    } finally {
      set({ loading: false })
    }
  }
}))
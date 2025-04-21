const supabaseGenerateTagsUrl = import.meta.env.VITE_SUPABASE_GENERATE_TAGS_URL
import { Session } from "@supabase/supabase-js"

const generateTags = async (bookmarkData: string, availableTags: string[], session: Session): Promise<string[] | null> => {
  try {
    const response = await fetch(supabaseGenerateTagsUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarkData, availableTags })
    })
    if (!response.ok) return null
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export default generateTags
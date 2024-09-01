const supabaseEfUrl = import.meta.env.VITE_SUPABASE_EF_URL
const supabaseEfAnonKey = import.meta.env.VITE_SUPABASE_EF_ANON_KEY

const getMetadata = async (url: string): Promise<Metadata | null> => {
  try {
    const response = await fetch(supabaseEfUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseEfAnonKey}`,
        "Content-Type": "text/plain",
      },
      body: url,
    })
    if (!response.ok) return null
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export default getMetadata
const jsonLinkKey = import.meta.env.VITE_JSONLINK_KEY

const getMetadata = async (url: string): Promise<Metadata | null> => {
  try {
    const response = await fetch(`https://jsonlink.io/api/extract?url=${url}&api_key=${jsonLinkKey}`)
    if (!response.ok) return null
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export default getMetadata
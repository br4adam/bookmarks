const clearUrl = (url: string): string => {
  const cleanedUrl = url.replace(/^(https?:\/\/)?/, "")
  const slashIndex = cleanedUrl.indexOf("/")
  if (slashIndex !== -1) return cleanedUrl.slice(0, slashIndex)
  return cleanedUrl
}

export default clearUrl
const getAvailableTags = (bookmarks: Bookmark[]): string[] => {
  const tags = new Set<string>()
  bookmarks.forEach(bookmark => { bookmark.tags.forEach(tag => tags.add(tag))})
  return Array.from(tags)
}

export default getAvailableTags
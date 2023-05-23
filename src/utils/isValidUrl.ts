const isValidUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url))
  } catch (error) {
    return false
  }
}

export default isValidUrl
type Bookmark = {
  id: number
  title: string
  url: string
  description: string
  image: string
  created_at: string
  saved_by: string
  tags: string[]
}

type Metadata = {
  title: string
  description: string
  images: string[]
  duration: number
  domain: string
  url: string
}

type Tag = {
  name: string,
  count: number
}
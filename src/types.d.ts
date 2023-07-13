type Bookmark = {
  id: number
  title: string
  domain: string
  url: string
  description: string
  image: string
  created_at: string
  saved_by: string
  tags: string[]
  pinned: boolean
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
  name: string
  count: number
}

type ResponseSuccess = {
  data: Bookmark[]
  success: true
}

type ResponseError = {
  data: string
  success: false
}

type StoreResponse = ResponseSuccess | ResponseError
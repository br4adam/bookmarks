import { useState, useMemo } from "react"

type Props = {
  className?: string
  email: string
  imageUrl?: string
}

const stringToNumber = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return hash
}

const getColorFromEmail = (email: string, offset: number) => {
  const hash = stringToNumber(email + offset)
  const hue = Math.abs(hash % 360)
  const saturation = 70
  const lightness = 55
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const Avatar = ({ className, email, imageUrl }: Props) => {
  const [ imgError, setImgError ] = useState<boolean>(false)

  const colorFrom = useMemo(() => getColorFromEmail(email, 0), [email])
  const colorTo = useMemo(() => getColorFromEmail(email, 50), [email])

  if (imageUrl && !imgError) return <img src={imageUrl} className={className} alt="User avatar" onError={() => setImgError(true)} />

  return (
    <div style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }} className={className} aria-label="User avatar" role="img" />
  )
}

export default Avatar
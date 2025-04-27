import { useState, useEffect, useRef } from 'react'

type UseProgressiveImageProps = {
  src: string | null
  fallbackSrc: string
  threshold?: number
  rootMargin?: string
}

type UseProgressiveImageReturn = {
  imageSrc: string
  isLoading: boolean
  imageRef: React.RefObject<HTMLElement>
}

const useProgressiveImage = ({ src, fallbackSrc, threshold = 0.1, rootMargin = '160px'}: UseProgressiveImageProps): UseProgressiveImageReturn => {
  const [ imageSrc, setImageSrc ] = useState<string>(fallbackSrc)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const imageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!src) {
      setImageSrc(fallbackSrc)
      setIsLoading(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const img = new Image()
          img.src = src

          img.onload = () => {
            setImageSrc(src)
            setIsLoading(false)
          }

          img.onerror = () => {
            setImageSrc(fallbackSrc)
            setIsLoading(false)
          }

          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (imageRef.current) observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [src, fallbackSrc, threshold, rootMargin])

  return { imageSrc, isLoading, imageRef }
}

export default useProgressiveImage
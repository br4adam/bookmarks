import { useEffect, useRef, useState } from "react"

const useScrollDirection = (initialDirection: 'up' | 'down' = 'up', threshold: number) => {
  const [ direction, setDirection ] = useState<string>(initialDirection)
  const lastScrollY = useRef(window.scrollY)
  const ticking = useRef(false)

  useEffect(() => {
    const updateScrollDir = () => {
      const scrollY = window.scrollY
      if (Math.abs(scrollY - lastScrollY.current) < threshold) {
        ticking.current = false
        return
      }
      setDirection(scrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = scrollY > 0 ? scrollY : 0
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDir)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}

export default useScrollDirection 
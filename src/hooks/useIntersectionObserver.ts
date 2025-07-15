import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (options = {}) => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, {
      root: null,
      rootMargin: '400px',
      threshold: 0.1,
      ...options
    })

    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [options])

  return { ref, isVisible }
}

export default useIntersectionObserver
import { useEffect, useRef, useState } from 'react'

const useCountUp = (to: number, duration: number = 3000): number => {
  const [ count, setCount ] = useState<number>(0)
  const start = useRef<number | null>(null)

  useEffect(() => {
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (start.current === null) start.current = timestamp
      const progress = timestamp - start.current

      const easing = (t: number): number => 1 - Math.pow(1 - t, 3)
      const value = Math.min(easing(progress / duration) * to, to)

      setCount(Math.floor(value))

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(to)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [to, duration])

  return count
}

export default useCountUp
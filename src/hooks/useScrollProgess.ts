import { useEffect, useState } from "react"

const useScrollProgess = () => {
  const [ completion, setCompletion ] = useState<number>(0)

  const updateScrollCompletion = () => {
    const progress = window.scrollY
    const height = document.body.scrollHeight - window.innerHeight
    if (height) setCompletion(Number((progress / height).toFixed(2)) * 100)
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScrollCompletion)
    return () => window.removeEventListener("scroll", updateScrollCompletion)
  }, [])

  return completion
}

export default useScrollProgess
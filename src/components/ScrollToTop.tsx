import { useState, useEffect } from "react"
import { ArrowUp } from "iconoir-react"

const ScrollToTop = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  
  const toggleVisibility = () => {
    if (window.scrollY > 800) setIsVisible(true)
    else setIsVisible(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <button onClick={scrollToTop} className="fixed z-20 flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-full bottom-8 right-8 bg-zinc-800/50 hover:bg-zinc-700/50 backdrop-blur-xl backdrop-saturate-150 hover:-translate-y-1" aria-label="scroll to top">
      <ArrowUp width={16} />
    </button> 
  )
}

export default ScrollToTop
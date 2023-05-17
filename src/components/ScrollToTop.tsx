import { useState, useEffect } from "react"
import { ArrowUp } from "iconoir-react"

const ScrollToTop = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) setIsVisible(true)
    else setIsVisible(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <button onClick={scrollToTop} className="fixed z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full bottom-8 right-8 bg-slate-800 hover:bg-slate-700 hover:-translate-y-1" aria-label="scroll to top">
      <ArrowUp width={16} />
    </button> 
  )
}

export default ScrollToTop
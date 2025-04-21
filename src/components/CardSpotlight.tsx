import { useState, useRef, ReactNode, CSSProperties } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const CardSpotlight = ({ className = "", style = {}, children }: Props) => {
  const [ opacity, setOpacity ] = useState<number>(0)
  const [ position, setPosition ] = useState<{x: number, y: number}>({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  const baseClasses = "rounded-lg relative p-3 flex flex-col gap-3 bg-zinc-900 border border-zinc-700 bg-cover"

  return (
    <div className={twMerge(baseClasses, className)} style={style} ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="absolute inset-0 transition-all duration-200 rounded-lg opacity-0 pointer-events-none" style={{ opacity, background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, #ffffff10, transparent)` }}>
      </div>
      {children}
    </div>
  )
}

export default CardSpotlight
import { useState, useRef, ReactNode } from "react"

type Props = {
  className?: string
  children: ReactNode
}

const CardSpotlight = ({ className = "", children }: Props) => {
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

  return (
    <div className={`p-[1px] rounded-xl bg-gradient-to-b shadow-lg from-zinc-700 to-zinc-700/50 hover:to-zinc-700/80 ${className}`} ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative flex flex-col h-full gap-4 p-3 bg-zinc-900 rounded-xl">
        <div className="absolute inset-0 transition-all duration-200 opacity-0 pointer-events-none rounded-xl" style={{ opacity, background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, #ffffff10, transparent)` }}>
        </div>
        { children }
      </div>
    </div>
  )
}

export default CardSpotlight
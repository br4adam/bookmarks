import { useState } from "react"
import { Cancel } from "iconoir-react"

const Badge = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(true)

  if (window.location.hostname === "kmarks.boo" || !isOpen) return null

  return (
    <span className="relative inline-block w-fit mx-auto overflow-hidden rounded-full p-[1px]">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#71717a_0%,#27272a_50%,#71717a_100%)]" />
      <div className="flex gap-1 h-full w-full items-center justify-center rounded-full bg-zinc-950 px-3 py-1 text-sm text-zinc-200 backdrop-blur-3xl">
        <p>From now on, please use <a href="https://kmarks.boo" className="font-bold underline">kmarks.boo</a>! &#127881;</p>
        <Cancel className="cursor-pointer text-zinc-500 hover:text-zinc-200 duration-200" width={16} onClick={() => setIsOpen(false)}/>
      </div>
    </span>
  )
}

export default Badge
import { Session } from "@supabase/supabase-js"
import { useBookmarkStore } from "../stores/BookmarkStore"
import dayjs from "dayjs"
import useCountUp from "../hooks/useCountUp"
import logo from "../assets/logo.png"
import { Xmark } from "iconoir-react"
import Modal from "./Modal"

type Props = {
  isProfileCardOpen: boolean
  closeProfileCard: () => void
  session: Session | null
}

const ProfileCard = ({ isProfileCardOpen, closeProfileCard, session }: Props) => {
  const bookmarks = useBookmarkStore(state => state.bookmarks)

  if (!session) return null

  const name = session.user?.user_metadata.name || session.user?.email
  const profilePicture = session.user?.user_metadata.avatar_url || logo
  const registrationDate = session.user.created_at
  const daysSinceFirstLogin = dayjs().diff(registrationDate, "days")
  const totalBookmarksCount = bookmarks.length
  const totalTagsCount = bookmarks.reduce((total, bookmark) => total + bookmark.tags.length, 0)

  return (
    <Modal isOpen={isProfileCardOpen} closeModal={closeProfileCard} className="flex flex-col gap-4 justify-center items-center border border-zinc-800 bg-zinc-950 text-zinc-200 text-center">
      <div className="absolute size-full bg-[radial-gradient(#71717a,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000000_70%,transparent_100%)] pointer-events-none"></div>
      <button className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-200 outline-none duration-200" onClick={closeProfileCard}><Xmark /></button>
      <img src={profilePicture} className="size-24 rounded-full z-10 my-8 select-none" alt="Profile picture" />
      <span className="border border-zinc-600 rounded-full px-3 py-1 text-sm">kmarks.boo</span>
      <h3 className="text-lg font-semibold w-full truncate">{name}</h3>
      <p className="text-sm text-balance text-zinc-500">Thank you for choosing kmarks.boo to be part of your online journey. Happy bookmarking!</p>
      <div className="flex w-full my-8">
        <Stat data={daysSinceFirstLogin} description="days" />
        <Stat data={totalBookmarksCount} description="bookmarks" />
        <Stat data={totalTagsCount} description="tags" />
      </div>
    </Modal>
  )
}

type StatProps = {
  data: number
  description: string
}

const Stat = ({ data, description }: StatProps) => {
  const count = useCountUp(data, 3000)

  return (
    <div className="flex flex-col w-1/3">
      <span className="text-2xl font-semibold">{count}</span>
      <span className="text-sm text-zinc-500">{description}</span>
    </div>
  )
}

export default ProfileCard
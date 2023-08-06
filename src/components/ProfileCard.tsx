import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Session } from "@supabase/supabase-js"
import { useBookmarkStore } from "../stores/BookmarkStore"
import dayjs from "dayjs"
import Balancer from "react-wrap-balancer"
import CountUp from "react-countup"
import logo from "../assets/logo.png"
import { Cancel } from "iconoir-react"

type Props = {
  isProfileCardOpen: boolean
  closeProfileCard: () => void
  session: Session | null
}

const ProfileCard = ({ isProfileCardOpen, closeProfileCard, session }: Props) => {
  const bookmarks = useBookmarkStore(state => state.bookmarks)

  if (!session) return null

  const name = session.user?.email
  const registrationDate = session.user.created_at
  const daysSinceFirstLogin = dayjs().diff(registrationDate, "days")
  const totalBookmarksCount = bookmarks.length
  const totalTagsCount = bookmarks.reduce((total, bookmark) => total + bookmark.tags.length, 0)

  return (
    <Transition appear show={isProfileCardOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30 antialiased" onClose={closeProfileCard}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-50 backdrop-brightness-50" />
        </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden flex flex-col gap-4 justify-center items-center transition-all transform rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-2xl backdrop-saturate-150 text-zinc-200 selection:bg-zinc-500/20 animate-rotate-y animate-duration-700">
                  <div className="absolute h-full w-full bg-[radial-gradient(#71717a,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000000_70%,transparent_100%)] pointer-events-none"></div>
                  <button className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-200 outline-none duration-200 animate-fade" onClick={closeProfileCard}><Cancel /></button>
                  <img src={logo} className="w-24 h-24 z-10 my-8 select-none" alt="Bookmarks logo" />
                  <span className="border border-zinc-600 rounded-full px-3 py-1 text-sm">kmarks.boo</span>
                  <Dialog.Title as="h3" className="text-lg font-semibold w-full truncate">{name}</Dialog.Title>
                  <p className="text-sm text-zinc-500"><Balancer>Thank you for choosing kmarks.boo to be part of your online journey. Happy bookmarking!</Balancer></p>
                  <div className="flex w-full my-8">
                    <Stat data={daysSinceFirstLogin} description="days" />
                    <Stat data={totalBookmarksCount} description="bookmarks" />
                    <Stat data={totalTagsCount} description="tags" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
      </Dialog>
    </Transition>
  )
}

type StatProps = {
  data: number
  description: string
}

const Stat = ({ data, description }: StatProps) => {
  return (
    <div className="flex flex-col w-1/3">
      <CountUp className="text-2xl font-semibold" end={data} duration={5} />
      <span className="text-sm text-zinc-500">{description}</span>
    </div>
  )
}

export default ProfileCard
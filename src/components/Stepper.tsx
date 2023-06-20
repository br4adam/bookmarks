import { ReactNode } from "react"
import { BookmarkEmpty, FilterList, Search } from "iconoir-react"

const Stepper = () => {
  return (
    <section className="w-full -mt-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] sm:bg-[length:800px_400px] bg-[length:400px_200px] bg-no-repeat bg-top from-zinc-400/10 to-60% to-transparent animate-fade animate-delay-200">
      <div className="flex flex-col items-center pt-16 pb-12 sm:pt-20 sm:pb-16 animate-fade-up animate-delay-500 animate-duration-500">
        <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-zinc-500">How it works</p>
        <h2 className="max-w-md text-3xl font-bold text-center text-transparent mb-14 from-zinc-400 via-zinc-200 to-zinc-400 bg-gradient-to-r bg-clip-text lg:max-w-full">Manage your bookmarks with just 3 easy steps</h2>
        <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
          <ListItem icon={<BookmarkEmpty width={18} />} title="Add websites" description="Just copy or type the URL of the website you want to save, and your bookmark will be instantly stored." />
          <ListItem icon={<FilterList width={18} />} title="Tag bookmarks" description="Add custom tags to each bookmark, making it a breeze to find and access your favorites." />
          <ListItem icon={<Search width={18} />} title="Filter and search" description="Easily filter your bookmarks by tags or experience lightning-fast searching with the command menu." withDivider={false}  />
        </ul>
      </div>
    </section>
  )
}

type ListItemProps = {
  icon: ReactNode
  title: string
  description: string
  withDivider?: boolean
}

const ListItem = ({ icon, title, description, withDivider = true }: ListItemProps) => {
  return (
    <li className="relative flex sm:flex-col sm:items-center sm:text-center group">
      { withDivider && <span className="absolute left-5 top-12 h-[calc(100%-24px)] w-px bg-zinc-700 sm:h-px sm:top-5 sm:left-[calc(50%+30px)] sm:w-[calc(100%-30px)]" aria-hidden="true"></span> }
      <div className="flex items-center justify-center w-10 h-10 duration-200 border rounded-lg aspect-square bg-zinc-900 border-zinc-700 text-zinc-200 group-hover:scale-110">
        {icon}
      </div>
      <div className="flex flex-col gap-2 mt-1 ml-6 sm:ml-0 sm:mt-6">
        <p className="text-lg font-medium text-zinc-200">{title}</p>
        <p className="text-zinc-500">{description}</p>
      </div>
    </li>
  )
}

export default Stepper
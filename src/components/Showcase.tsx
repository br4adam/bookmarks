import Button from "./Button"
import browser from "../assets/browser.webp"
import { useAuthStore } from "../stores/AuthStore"
import { ArrowRight, GitHub, Twitter } from "iconoir-react"

const Showcase = () => {
  const { loading, login } = useAuthStore(state => ({ loading: state.loading, login: state.login }))

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/br4adam/bookmarks", icon: <GitHub width={16} />},
    { name: "Twitter", url: "https://twitter.com/br4adam", icon: <Twitter width={16} />}
  ]

  return (
    <div className="flex flex-col items-center gap-8">
      <Button onClick={login} loading={loading}>Get Started Now <ArrowRight width={16} /></Button>
      <div className="w-full select-none backdrop-blur-lg">
        <img src={browser} alt="bookmarks app browser mockup" />
      </div>
      <div className="flex gap-8 text-zinc-700">
        { socialLinks.map(link => <a href={link.url} target="_blank" className="flex gap-1 duration-200 hover:text-zinc-500">{link.icon} {link.name}</a>)}
      </div>
    </div>
  )
}

export default Showcase
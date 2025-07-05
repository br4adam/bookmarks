import { ReactNode, useState, FormEvent } from "react"
import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"
import Modal from "./Modal"
import { Github, Sparks } from "iconoir-react"
import { toast } from "sonner"
import { errorToastStyle, successToastStyle } from "../utils/toastStyles"

type Props = {
  className?: string
  children: ReactNode
}

const Login = ({ children, className }: Props) => {
  const { loading, loginWithGithub, loginWithOtp } = useAuthStore(state => ({ loading: state.loading, loginWithGithub: state.loginWithGithub, loginWithOtp: state.loginWithOtp }))
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
  const [ email, setEmail ] = useState<string>("")
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailRegex.test(email)) return toast.error("Please add a valid email address!", errorToastStyle)
    loginWithOtp(email)
    toast.success(`Please check your email! We've sent the login link to ${email}.`, successToastStyle)
    setEmail("")
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} loading={loading} className={className}>
        {children}
      </Button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} title="Welcome">
        <p className="mt-2 text-sm text-zinc-500">Sign in via Magic Link with your email or continue with your GitHub account.</p>
        <div className="flex flex-col items-center gap-2 mt-4 text-zinc-950">
          <form className="flex flex-col items-center w-full gap-2" onSubmit={handleLogin}>
            <input className="w-full text-sm px-3 py-2 mt-1 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" name="email" autoComplete="on" autoFocus />
            <Button type="submit" className="justify-center w-full bg-zinc-950 text-zinc-100 hover:bg-zinc-900"><Sparks width={18} strokeWidth={1.75} />Send Magic Link</Button>
          </form>
          <div className="flex items-center w-full tex">
            <span className="flex-grow h-[1px] bg-zinc-500" aria-hidden="true"></span>
            <span className="mx-2 my-1 text-sm text-zinc-500">OR</span>
            <span className="flex-grow h-[1px] bg-zinc-500" aria-hidden="true"></span>
          </div>
          <Button onClick={loginWithGithub} className="justify-center w-full bg-zinc-950 text-zinc-100 hover:bg-zinc-900"><Github width={18} strokeWidth={1.75} />Continue with GitHub</Button>
        </div>
      </Modal>
    </>
  )
}

export default Login
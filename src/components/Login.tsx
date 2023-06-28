import { Fragment, ReactNode, useState, FormEvent } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"
import { GitHub, Sparks } from "iconoir-react"
import { toast } from "sonner"

type Props = {
  className?: string
  children: ReactNode
}

const Login = ({ children, className }: Props) => {
  const { session, loading, loginWithGithub, loginWithOtp, logout } = useAuthStore(state => ({ session: state.session, loading: state.loading, loginWithGithub: state.loginWithGithub, loginWithOtp: state.loginWithOtp, logout: state.logout }))
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
  const [ email, setEmail ] = useState<string>("")
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailRegex.test(email)) return toast.error("Please add a valid email address!")
    loginWithOtp(email)
    toast.success(`Please check your email! We've sent the login link to ${email}.`)
    setEmail("")
    closeModal()
  }

  if (session) return <Button onClick={logout} loading={loading}>Logout</Button>

  return (
    <>
      <Button onClick={openModal} loading={loading} className={className}>
        { children }
      </Button>
      <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30 antialiased" onClose={closeModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-brightness-50" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-full p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-lg bg-zinc-200 selection:bg-zinc-500/20">
                <Dialog.Title as="h3" className="text-lg font-semibold text-zinc-900">Welcome back</Dialog.Title>
                <p className="mt-2 text-sm text-zinc-500">Sign in via Magic Link with your email or continue with your GitHub account.</p>
                <div className="flex flex-col items-center gap-2 mt-4 text-zinc-900">
                  <form className="flex flex-col items-center w-full gap-2" onSubmit={handleLogin}>
                    <input className="w-full px-4 py-2 mt-1 bg-transparent border rounded-md border-zinc-700 focus:border-zinc-500 focus:outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" name="email" autoComplete="on" autoFocus />
                    <Button type="submit" className="justify-center w-full bg-zinc-900 text-zinc-200 hover:bg-zinc-800"><Sparks width={18} strokeWidth={1.75} />Send Magic Link</Button>
                  </form>
                  <div className="flex items-center w-full tex">
                    <span className="flex-grow h-[1px] bg-zinc-500" aria-hidden="true"></span>
                    <span className="mx-2 my-1 text-sm text-zinc-500">OR</span>
                    <span className="flex-grow h-[1px] bg-zinc-500" aria-hidden="true"></span>
                  </div>
                  <Button onClick={loginWithGithub} className="justify-center w-full bg-zinc-900 text-zinc-200 hover:bg-zinc-800"><GitHub width={18} strokeWidth={1.75} />Continue with GitHub</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  )
}

export default Login
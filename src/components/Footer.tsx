import { useState, useEffect, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Xmark } from "iconoir-react"
import ReactMarkdown from "react-markdown"
import PrivacyFile from "../assets/privacy.md"

const Footer = () => {
  const [ isPrivacyPolicyOpen, setIsPrivacyPolicyOpen ] = useState<boolean>(false)
  const closePrivacyPolicy = () => setIsPrivacyPolicyOpen(false)

  return (
    <footer className="flex items-center justify-start h-10 mb-8 w-11/12 max-w-6xl gap-4 mx-auto md:w-10/12 md:justify-end animate-fade-up animate-delay-[1700ms] animate-duration-500">
      <span>kmarks.boo</span>
      <span className="text-zinc-700">|</span>
      <button className="cursor-pointer" onClick={() => setIsPrivacyPolicyOpen(prev => !prev)}>Privacy</button>
      { isPrivacyPolicyOpen && <PrivacyPolicy isPrivacyPolicyOpen={isPrivacyPolicyOpen} closePrivacyPolicy={closePrivacyPolicy} /> }
    </footer>
  )
}

type PrivacyPolicyProps = {
  isPrivacyPolicyOpen: boolean
  closePrivacyPolicy: () => void
}

const PrivacyPolicy = ({ isPrivacyPolicyOpen, closePrivacyPolicy }: PrivacyPolicyProps) => {
  const [ privacyPolicyText, setPrivacyPolicyText ] = useState("")

  useEffect(() => {
   fetch(PrivacyFile).then(res => res.text()).then(text => setPrivacyPolicyText(text))
  })

  return (
    <Transition appear show={isPrivacyPolicyOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30 antialiased" onClose={closePrivacyPolicy}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-50 backdrop-brightness-50" />
        </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-3xl p-6 overflow-hidden flex flex-col gap-4 justify-center items-center transition-all transform rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-2xl backdrop-saturate-150 text-zinc-200 selection:bg-zinc-500/20">
                  <button className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-200 outline-none duration-200 animate-fade" onClick={closePrivacyPolicy}><Xmark /></button>
                  <Dialog.Title as="h3" className="text-lg font-semibold w-full truncate">Privacy Policy</Dialog.Title>
                  <div className="max-h-[65vh] overflow-auto text-left flex flex-col gap-4">
                    <ReactMarkdown children={privacyPolicyText} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
      </Dialog>
    </Transition>
  )
}

export default Footer
import { useState, useEffect } from "react"
import { useModalStore } from "../stores/ModalStore"
import { Page, Bug, Xmark } from "iconoir-react"
import Modal from "./Modal"
import ReactMarkdown from "react-markdown"
import PrivacyFile from "../assets/privacy.md"

const Footer = () => {
  const setModalOpen = useModalStore(state => state.setModalOpen)
  const [ isPrivacyPolicyOpen, setIsPrivacyPolicyOpen ] = useState<boolean>(false)

  const openPrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(true)
    setModalOpen(true)
  }

  const closePrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(false)
    setModalOpen(false)
  }

  return (
    <footer className="flex flex-col sm:items-center justify-start text-sm mb-12 mt-auto w-full px-4 max-w-6xl gap-4 mx-auto sm:flex-row md:w-10/12 md:justify-end [&>*]:w-fit">
      <a href="https://kmarks.boo" className="font-bold">kmarks.boo</a>
      <span className="text-zinc-700 hidden sm:block">|</span>
      <button onClick={() => openPrivacyPolicy()} className="flex items-center gap-2 cursor-pointer">
        <Page className="size-4"/>
        Privacy Policy
      </button>
      <span className="text-zinc-700 hidden sm:block">|</span>
      <a href="https://github.com/br4adam/bookmarks/issues/new" target="_blank" className="flex items-center gap-2">
        <Bug className="size-4"/>
        Report a bug
      </a>
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
    <Modal isOpen={isPrivacyPolicyOpen} closeModal={closePrivacyPolicy} title="Privacy Policy" className="border border-zinc-800 bg-zinc-950 text-zinc-100">
      <button className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-100 outline-none duration-200" onClick={closePrivacyPolicy}><Xmark /></button>
      <div className="max-h-[65dvh] overflow-auto text-left flex flex-col gap-4 text-sm mt-4">
        <ReactMarkdown children={privacyPolicyText} />
      </div>
    </Modal>
  )
}

export default Footer
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
  isOpen: boolean
  closeModal: () => void
  title?: string
  children: React.ReactNode
}

const Modal = ({ className = "", isOpen, closeModal, title, children }: Props) => {
  const baseClasses = "w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-xl bg-zinc-200 text-zinc-950 selection:bg-zinc-500/20"

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30 antialiased" onClose={closeModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-50 backdrop-brightness-50" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className={twMerge(baseClasses, className)}>
                { title && <Dialog.Title as="h3" className="text-lg font-semibold">{title}</Dialog.Title> }
                { children }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
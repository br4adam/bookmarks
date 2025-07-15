import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
  isOpen: boolean
  closeModal: () => void
  title?: string
  children: React.ReactNode
}

const Modal = ({ className = "", isOpen, closeModal, title, children }: Props) => {
  const baseClasses = "w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-xl bg-zinc-100 text-zinc-950 selection:bg-zinc-500/20"

  return (
    <Dialog open={isOpen} className="relative z-30 antialiased" onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-opacity-50 bg-zinc-950 backdrop-brightness-50">
        <DialogPanel className={twMerge(baseClasses, className)}>
          { title && <DialogTitle className="text-lg font-semibold">{title}</DialogTitle> }
          { children }
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default Modal
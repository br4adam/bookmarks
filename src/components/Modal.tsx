import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
  isOpen: boolean
  closeModal: () => void
  title?: string
  children: React.ReactNode
}

const Modal = ({ className = "", isOpen, closeModal, title, children }: Props) => {
  const baseClasses = "w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-xl bg-zinc-100 text-zinc-950 selection:bg-zinc-500/20 data-closed:scale-95 data-closed:opacity-0 duration-300 ease-out"

  return (
    <Dialog open={isOpen} className="relative z-30 antialiased" onClose={closeModal}>
      <DialogBackdrop transition className="fixed inset-0 bg-opacity-50 bg-zinc-950 backdrop-brightness-50 duration-300 ease-out data-closed:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className={twMerge(baseClasses, className)}>
          { title && <DialogTitle className="text-lg font-semibold">{title}</DialogTitle> }
          { children }
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default Modal
import { ReactNode } from "react"
import { toast } from "sonner"
import { defaultToastStyle, successToastStyle, errorToastStyle } from "./toastStyles"

type ToastOptions = {
  id?: string | number
  closeButton?: boolean
  duration?: number
  action?: { label: string, onClick: () => void }
  description?: string
  icon?: ReactNode | null
}

export const showSuccessToast = (message: string, options?: ToastOptions) =>
  toast.success(message, { closeButton: true, ...successToastStyle, ...options })

export const showErrorToast = (message: string, options?: ToastOptions) =>
  toast.error(message, { closeButton: true, ...errorToastStyle, ...options })

export const showInfoToast = (message: string, options?: ToastOptions) =>
  toast.info(message, { closeButton: true, ...defaultToastStyle, ...options })

export const showLoadingToast = (message: string, options?: ToastOptions) =>
  toast.loading(message, { closeButton: false, ...defaultToastStyle, ...options })

export const dismissToast = (toastId?: string | number) => toast.dismiss(toastId)
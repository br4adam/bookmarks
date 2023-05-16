import { DetailedHTMLProps, ReactNode } from "react"

type Props = {
  className?: string
  loading?: boolean
  children: ReactNode
} & DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({ className = "", loading = false, children, ...props}: Props) => {
  return (
    <button className={`px-4 py-2 w-max font-medium flex items-center gap-2 rounded-md bg-slate-900 transition-all duration-200 border border-slate-700 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} disabled={loading} {...props}>
      { loading && <span className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" role="status" aria-label="loading"></span> }
      { children }
    </button>
  )
}

export default Button
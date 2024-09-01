const createToastStyle = (bgColor: string, textColor: string, borderColor: string) => ({
  classNames: {
    toast: `!bg-${bgColor} !text-${textColor} !border-${borderColor}`,
    closeButton: `!bg-${bgColor} !text-${textColor} !border-${borderColor}`
  }
})

export const defaultToastStyle = createToastStyle("zinc-900", "zinc-200", "zinc-700")
export const successToastStyle = createToastStyle("#001f0f", "#59f3a6", "#003d1c")
export const errorToastStyle = createToastStyle("#2d0607", "#ff9ea1", "#4d0408")
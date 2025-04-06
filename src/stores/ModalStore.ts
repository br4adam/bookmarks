import { create } from 'zustand'

type ModalState = {
	isAnyModalOpen: boolean
	setModalOpen: (isOpen: boolean) => void
}

export const useModalStore = create<ModalState>((set) => ({
	isAnyModalOpen: false,
	setModalOpen: (isOpen) => set({ isAnyModalOpen: isOpen })
}))
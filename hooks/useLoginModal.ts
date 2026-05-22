import { create } from 'zustand';

interface LoginModalState {
    message: string;
    isOpen: boolean;
}

interface LoginModalActions {
    setMessage: (msg: string) => void;
}

type LoginModal = LoginModalState & LoginModalActions;

export const useLoginModal = create<LoginModal>((set) => ({
    message: '',
    isOpen: false,

    setMessage: (msg: string) => {
        set({ isOpen: true, message: msg }),
            setTimeout(() => {
                set({ isOpen: false, message: '' })
            }, 2000)
    }
}));
import { create } from 'zustand';

interface ToastState {
    message: string;
    isOpen: boolean;
}

interface ToastActions {
    setMessage: (msg: string) => void;
}

type Toast = ToastState & ToastActions;

export const useToast = create<Toast>((set) => ({
    message: '',
    isOpen: false,

    setMessage: (msg: string) => {
        set({ isOpen: true, message: msg });
        setTimeout(() => {
            set({ isOpen: false, message: '' });
        }, 2000);
    },
}));

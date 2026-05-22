'use client'

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    zIndex?: string;
    padding?: boolean;
}

export default function Modal({ onClose, children, zIndex = 'z-50', padding = true }: ModalProps) {
    return (
        <div className={`fixed inset-0 ${zIndex} flex items-center justify-center ${padding ? 'p-4' : ''}`}>
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            {children}
        </div>
    );
}

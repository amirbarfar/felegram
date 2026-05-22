"use client";
import { useLoginModal } from "@/hooks/useLoginModal";

export function LoginModal() {
    const { isOpen, message } = useLoginModal();

    if (!isOpen) return null;

    return (
        <div className="absolute duration-300 p-4 sm:p-6 z-100">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-xs bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-in slide-in-from-bottom-right duration-300 transition-colors">
                <p className="text-sm w-auto text-gray-700 leading-relaxed text-center transition-colors">
                    {message || "در حال بارگذاری..."}
                </p>
            </div>
        </div>
    );
}
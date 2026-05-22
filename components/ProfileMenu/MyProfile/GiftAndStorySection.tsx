import { X, ArrowLeft } from "lucide-react";
import Modal from "@/components/Modal";

interface GiftSectionProps {
  onClose: () => void;
  onBack: () => void;
  content: string
}

export default function GiftAndStorySection({ onClose, onBack, content }: GiftSectionProps) {
  return (
    <Modal onClose={onClose} zIndex="z-60">
      <div className={`relative ${content === 'آرشیو استوری ها' ? "h-1/2" : "min-h-[70vh]"} w-142 bg-white dark:bg-zinc-950 rounded-lg shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300`}>
        <div className="flex items-center justify-between gap-2 px-4 py-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
          <div className='flex items-center'>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer transition-colors text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-100"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
            <h2 className="text-xl px-2 text-gray-900 dark:text-zinc-100 font-light">{content}</h2>
          </div>
          <button
            onClick={onBack}
            className="p-2 cursor-pointer transition-colors text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="w-8 h-8 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
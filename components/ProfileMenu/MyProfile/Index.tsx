import { UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import ProfileModal from './ProfileModal';
import Modal from '@/components/Modal';

export default function MyProfile() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div className="relative">
            <div onClick={() => setIsOpenModal(true)} className="flex cursor-pointer w-full hover:bg-zinc-100 dark:hover:bg-zinc-800 my-0.5 justify-start items-center p-3 px-5 gap-3 transition-colors duration-200">
                <UserCircle2 className="w-6 h-6 stroke-1 text-gray-600 dark:text-zinc-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-zinc-100">پروفایل من</p>
            </div>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)} zIndex="z-40">
                    <div onClick={(e) => e.stopPropagation()}>
                        <ProfileModal setIsOpen={setIsOpenModal} isOpen={isOpenModal} />
                    </div>
                </Modal>
            )}
        </div>
    )
}
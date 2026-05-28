import { Dispatch, SetStateAction } from 'react'
import { ChevronDown } from 'lucide-react'
import UserAvatar from '../UserAvatar'
import { useUserProfile } from '@/hooks/useUserProfile'

interface HeaderProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
    const {data} = useUserProfile();

    if (!data) {
        return <div className="p-3 px-5" > Loading...</div>;
    }

    return (
        <div>
            <div className="p-2 px-4">
                <UserAvatar name={data.firstname || ''} image={data.image} size={20} isActive={false}/>
            </div>
            <div onClick={() => setIsOpen(prev => !prev)} className="flex cursor-pointer justify-between items-center mt-1 pb-3 px-4 pr-5 border-b">
                <div>
                    <h1 className="text-base">{data.firstname} {data.lastname}</h1>
                    <p className="text-sm text-my-blue cursor-pointer">اضافه کردن وضعیت</p>
                </div>
                <ChevronDown className={`w-5 h-5 opacity-70 ${isOpen ? 'rotate-180' : 'rotate-0'} duration-250 transition-transform`} />
            </div>
        </div>
    )
}

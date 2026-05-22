import React from "react"
import { FieldKey, faToFieldKey } from "@/lib/types/ProfileFieldTypes";

interface ProfileInfoItemProps {
    title: string,
    content: React.ReactNode,
    icon: React.ReactNode
    setEditTitle: (value: FieldKey) => void
    setIsOpen : () => void
}

export default function ProfileEditInfoItem({ title, content, icon, setEditTitle , setIsOpen }: ProfileInfoItemProps) {
    const handleSetTitle = () => {
        const res = faToFieldKey[title];
        if (res) {
            setEditTitle(res);
            setIsOpen();
        }
    }
    return (
        <div onClick={handleSetTitle} className="flex justify-between items-center px-6 py-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
            <div className="flex items-center gap-6">
                <span className="stroke-[1.2] w-7 h-7 text-gray-600 dark:text-zinc-400">
                    {icon}
                </span>
                <p className="text-lg text-gray-800 dark:text-zinc-100">{title}</p>
            </div>
            <h3 className="text-my-blue text-lg">{content}</h3>
        </div>
    )
}
interface ProfileInfoItemProps{
    title : string,
    content : React.ReactNode
}

export default function ProfileInfoItem({ title , content } : ProfileInfoItemProps) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">{content}</h3>
            <p className="opacity-70 text-gray-600 dark:text-zinc-400">{title}</p>
        </div>
    )
}
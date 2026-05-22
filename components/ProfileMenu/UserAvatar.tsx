import Image from 'next/image';

interface UserAvatarProps {
    name?: string;
    size?: number;
    isActive: boolean;
}

export default function UserAvatar({ name = "", size = 10, isActive }: UserAvatarProps) {
    const px = size * 4;
    const borderClass = isActive ? 'border-2 border-my-blue' : 'border-2 border-transparent';

    if (!name) return null;

    const initials = name.charAt(0).toUpperCase();

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
        'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-teal-400',
    ];
    const bgClass = colors[Math.abs(hash) % colors.length];

    return (
        <div
            className={`flex items-center justify-center shrink-0 text-white font-bold rounded-full ${bgClass} ${borderClass}`}
            style={{ width: px, height: px }}
        >
            {initials}
        </div>
    );
}

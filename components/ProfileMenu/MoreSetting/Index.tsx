import { useTheme } from "@/hooks/theme/ThemeContext";
import { Bookmark, Megaphone, Moon, Phone, Settings, Sun, User2, Users2 } from "lucide-react";

type MenuItem = {
    icon: React.ReactNode;
    title: string;
};

const menuItems: MenuItem[] = [
    { icon: <Users2 className="w-7 h-7 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "گروه جدید" },
    { icon: <Megaphone className="w-7 h-7 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "کانال جدید" },
    { icon: <User2 className="w-7 h-7 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "مخاطبین" },
    { icon: <Phone className="w-7 h-7 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "تماس‌ها" },
    { icon: <Settings className="w-7 h-7 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "تنظیمات" },
    { icon: <Bookmark className="w-7 h-7 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "پیام‌های ذخیره شده" },
];

export default function MoreSettings() {
    const { theme, toggleTheme } = useTheme()
    return (
        <div className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 pt-3 flex flex-col gap-y-1">
            {menuItems.map((item, index) => (
                <div key={index} className="flex items-center gap-5 py-4 px-7 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                    <span className="shrink-0">
                        {item.icon}
                    </span>
                    <p className="text-lg font-medium text-gray-800 dark:text-zinc-100">{item.title}</p>
                </div>
            ))}
            <div onClick={toggleTheme} className="flex items-center gap-5 py-4 px-7 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                <span className="shrink-0 text-gray-600 dark:text-zinc-400">
                    {theme === "light" ? <Moon className="w-8 h-8 stroke-[1.5]" /> : <Sun className="w-8 h-8 stroke-[1.5]" />}
                </span>
                <p className="text-xl font-medium text-gray-800 dark:text-zinc-100">
                    {theme === "light" ? "حالت تاریک" : "حالت روشن"}
                </p>
            </div>
            <div className="p-8 text-lg opacity-70 dark:text-white fixed -bottom-5 text-gray-500 ">
                <p>سایت فلگرام.</p>
                <p>ورژن ۱.۰.۰ - درباره</p>
            </div>
        </div>
    );
}
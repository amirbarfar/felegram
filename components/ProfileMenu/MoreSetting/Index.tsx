import { useTheme } from "@/hooks/theme/ThemeContext";
import { Bookmark, Megaphone, Moon, Phone, Settings, Sun, User2, Users2 } from "lucide-react";

type MenuItem = {
    icon: React.ReactNode;
    title: string;
};

const menuItems: MenuItem[] = [
    { icon: <Users2 className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "گروه جدید" },
    { icon: <Megaphone className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "کانال جدید" },
    { icon: <User2 className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "مخاطبین" },
    { icon: <Phone className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "تماس‌ها" },
    { icon: <Settings className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "تنظیمات" },
    { icon: <Bookmark className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-zinc-400" />, title: "پیام‌های ذخیره شده" },
];

export default function MoreSettings() {
    const { theme, toggleTheme } = useTheme()
    return (
        <div className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 pt-3 flex flex-col gap-y-1">
            {menuItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-2.5 px-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                    <span className="shrink-0">
                        {item.icon}
                    </span>
                    <p className="text-sm font-medium text-gray-800 dark:text-zinc-100">{item.title}</p>
                </div>
            ))}
            <div onClick={toggleTheme} className="flex items-center gap-4 py-2.5 px-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                <span className="shrink-0 text-gray-600 dark:text-zinc-400">
                    {theme === "light" ? <Moon className="w-5 h-5 stroke-[1.5]" /> : <Sun className="w-5 h-5 stroke-[1.5]" />}
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-zinc-100">
                    {theme === "light" ? "حالت تاریک" : "حالت روشن"}
                </p>
            </div>
            <div className="p-5 text-sm opacity-70 dark:text-white fixed bottom-4 text-gray-500 ">
                <p>سایت فلگرام.</p>
                <p>ورژن ۱.۰.۰ - درباره</p>
            </div>
        </div>
    );
}
import { AtSign, Gift, Megaphone, Phone, UserCircle2 } from "lucide-react";
import { AccountType } from "@/lib/types/AccountType";

const iconClass = "w-7 h-7 text-gray-600 dark:text-zinc-400";

export function getBasicInfoItems(data: AccountType) {
    return [
        {
            title: "نام",
            content: `${data.firstname ?? ''} ${data.lastname ?? ''}`.trim(),
            icon: <UserCircle2 className={iconClass} />,
        },
        {
            title: "شماره تلفن",
            content: data.phone,
            icon: <Phone className={iconClass} />,
        },
        {
            title: "نام کاربری",
            content: data.username || 'هیچ نام کاربری وجود ندارد',
            icon: <AtSign className={iconClass} />,
        },
    ];
}

export function getExtraInfoItems(data: AccountType, birthdayLabel: string | null) {
    return [
        {
            title: "کانال عمومی",
            content: data.channel || 'کانالی ثبت نشده',
            icon: <Megaphone className={iconClass} />,
        },
        {
            title: "تاریخ تولد",
            content: birthdayLabel || 'تاریخ تولد ثبت نشده',
            icon: <Gift className={iconClass} />,
        },
    ];
}

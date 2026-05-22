import { useAuth } from "@/hooks/useAuth";
import { api } from "@/utils/api";
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import { AccountType } from "@/lib/types/AccountType";
import { useUserProfile } from "@/hooks/useUserProfile";

interface AccountProps {
    isOpen: boolean
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Account({ isOpen }: AccountProps) {
    const [data, setData] = useState<AccountType[]>([]);
    const { refreshKey } = useUserProfile()
    const { loading, isAuthenticated } = useAuth();
    const { setMessage } = useToast();
    const [isSwitching, setIsSwitching] = useState(false);

    const fetchData = async () => {
        const res = await api('/api/accounts', { method: "GET" });
        setData(res.accounts);
    };

    useEffect(() => {
        if (isAuthenticated && !loading) {
            fetchData();
        }
    }, [loading, isAuthenticated, refreshKey])

    if (!data) {
        return <div className="p-3 px-5" > Loading...</div>;
    }

    const switchAccount = async (selectedPhone: string) => {
        setIsSwitching(true)
        try {
            const res = await api('/api/accounts/switch-account', {
                method: 'POST',
                body: JSON.stringify({ phone: selectedPhone })
            });

            if (res.success) {
                window.location.reload();
            } else {
                setMessage(res.error || 'خطا در تغییر اکانت');
            }
        } catch (error) {
            console.error(error);
            setMessage('مشکلی پیش آمد');
        }
    };


    return (
        <div className={`w-full flex justify-start gap-x-4  flex-col transition-all duration-300 ease-in-out overflow-y-scroll h-30 scrollbar ${isOpen ? 'max-h-42 mt-2 opacity-100 border-b border-zinc-200 dark:border-zinc-800' : 'max-h-0 opacity-0'}`}>
            {isSwitching && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                    <p className="text-white text-lg font-bold">در حال تغییر اکانت...</p>
                </div>
            )}
            {data.map((item, index) => (
                <div key={index} onClick={() => switchAccount(item.phone)} className="flex cursor-pointer justify-between items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 px-5 py-1">
                    <div className="flex justify-center items-center gap-x-4 py-1">
                        <UserAvatar name={item?.firstname || ''} isActive={item.isActive} size={10} />
                        <p className="text-lg text-zinc-900 dark:text-zinc-100">{item?.firstname} {item?.lastname}</p>
                    </div>
                    {!item.isActive && (
                        <div className="w-12 h-6 rounded-xl flex justify-center items-center text-white bg-my-blue">
                            <p>۱۲۷۶</p>
                        </div>
                    )}
                </div>
            ))
            }
            <Link href={'/auth/login'} className="w-full flex justify-start p-1 items-center gap-1 gap-x-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer px-5 py-3 mb-2">
                <div className="w-7 h-7 bg-my-blue rounded-full flex justify-center mx-2 items-center">
                    <Plus className="text-white w-5" />
                </div>
                <p className="text-lg text-zinc-900 dark:text-zinc-100">افزودن حساب کاربری</p>
            </Link>
        </div>
    )
}
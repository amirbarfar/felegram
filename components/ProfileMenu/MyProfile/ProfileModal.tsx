import { CirclePlay, Gift, Pencil, Plus, X } from "lucide-react";
import ProfileInfoItem from "./ProfileInfoItem";
import { useEffect, useRef, useState } from "react";
import GiftAndStorySection from "./GiftAndStorySection";
import EditProfile from "./EditProfile";
import AgeSummary from "@/hooks/useUserAgeSummary";
import { useUserProfile } from "@/hooks/useUserProfile";

interface ProfileModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function ProfileModal({ setIsOpen, isOpen }: ProfileModalProps) {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScroll, setIsScroll] = useState(false);

    const [showGift, setShowGift] = useState(false);
    const [showStory, setShowStory] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const { data } = useUserProfile()

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        if (data?.channel) {
            const handleScroll = () => {
                if (container.scrollTop > 50) {
                    setIsScroll(true)
                } else {
                    setIsScroll(false)
                }
            }
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [])



    return (
        <>
            <div className={`w-110 ${isOpen && !showGift && !showStory && !showEdit ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"} transition-opacity transform duration-300 ease-in-out rounded-lg bg-white dark:bg-zinc-800 flex-col flex max-h-[90vh] shadow-xl`}>
                <div className={`bg-shiri dark:bg-zinc-800 transition-all duration-500 ease-in-out overflow-hidden ${isScroll ? 'max-h-20 flex justify-between items-center pb-6' : 'max-h-52 pb-14'} rounded-t-lg`}>
                    <div className="flex gap-5 pt-5 px-5">
                        <X onClick={() => setIsOpen(false)} className="w-6 h-6 cursor-pointer stroke-[1.5] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100" />
                        <Pencil onClick={() => setShowEdit(true)} className="w-5 h-5 cursor-pointer stroke-[1.5] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100" />
                    </div>
                    <div className={`flex justify-center items-center ${isScroll ? "flex gap-2 px-5 mt-5 " : "flex-col"} -mt-5`}>
                        <div className="flex justify-center items-center shrink-0">
                            <div
                                className="relative rounded-full overflow-hidden border-2 border-my-blue bg-white dark:bg-zinc-900"
                                style={{ width: isScroll ? 44 : 112, height: isScroll ? 44 : 112 }}
                            >
                                <img src={data?.image || "/test.png"} alt="" className="object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <h2 className={`text-lg ${isScroll ? "text-base" : ""} font-bold text-gray-900 dark:text-zinc-100`} >{data?.firstname} {data?.lastname}</h2>
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                آنلاین
                            </span>
                        </div>
                    </div>
                </div>
                <div ref={scrollContainerRef} className="scrollbar sticky top-0 rounded-b-lg bg-shiri dark:bg-zinc-800 overflow-y-auto">
                    {data?.channel &&
                        <div className={`px-5 py-3 flex gap-3 bg-white dark:bg-zinc-900 ${isScroll ? "mt-24" : ""}`}>
                            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                                <img src="/test.png" alt="" className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold mb-1 mt-1 text-gray-900 dark:text-zinc-100">یادگیری همراه من</h3>
                                <p className="opacity-70 text-sm text-gray-700 dark:text-zinc-300">این یک متن تستی است که به طور مثال داخل چنل قرار گرفته...</p>
                                <p className="text-sm mt-1 opacity-70 text-gray-700 dark:text-zinc-300">کانال . ۲۵ عضو</p>
                            </div>
                        </div>
                    }
                    <div className="bg-white dark:bg-zinc-900 py-3 px-5 text-sm flex flex-col gap-4">
                        {data?.phone && <ProfileInfoItem title={"موبایل"} content={data.phone} />}
                        {data?.bio && <ProfileInfoItem title={"درباره من"} content={data.bio} />}
                        {data?.username && <ProfileInfoItem title={"نام کاربری"} content={`@${data.username}`} />}
                        {data?.birthday && <ProfileInfoItem title={"تاریخ تولد"} content={<AgeSummary birthday={data.birthday} />} />}
                    </div>
                    <div className="mt-3 bg-white dark:bg-zinc-900 overflow-hidden">
                        <button onClick={() => setShowGift(true)} className="flex items-center gap-4 w-full px-5 py-3 mt-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 group">
                            <Gift className="w-5 h-5 stroke-[1.5] text-gray-500 dark:text-zinc-400" />
                            <p className="text-sm font-medium text-gray-700 dark:text-zinc-100">گیفت ها</p>
                        </button>
                        <button onClick={() => setShowStory(true)} className="flex items-center gap-4 w-full px-5 py-3 mb-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 group">
                            <CirclePlay className="w-5 h-5 stroke-[1.5] text-gray-500 dark:text-zinc-400" />
                            <p className="text-sm font-medium text-gray-700 dark:text-zinc-100">آرشیو استوری ها</p>
                        </button>
                    </div>
                    <div className="w-full cursor-pointer flex opacity-70 font-bold justify-center items-center py-3 px-5 text-sm text-gray-700 dark:text-zinc-300">
                        <button type="button" className="cursor-pointer">اضافه کردن آلبوم</button>
                        <Plus size={14} />
                    </div>
                    <div className="w-full px-5 py-4 flex justify-center items-center bg-white dark:bg-zinc-900 h-24">
                        <p className="text-sm text-gray-500 dark:text-zinc-500">هنوز هیچ آلبومی وجود نداره.</p>
                    </div>
                </div>
            </div>
            {showGift && (
                <GiftAndStorySection
                    onClose={() => { setIsOpen(false), setShowGift(false) }}
                    onBack={() => setShowGift(false)}
                    content="گیفت های من"
                />
            )}

            {showStory && (
                <GiftAndStorySection
                    onClose={() => { setIsOpen(false), setShowStory(false) }}
                    onBack={() => setShowStory(false)}
                    content="آرشیو استوری ها"
                />
            )}
            {
                showEdit &&
                <EditProfile
                    onClose={() => setShowEdit(false)}
                    onBack={() => setShowEdit(false)}
                    content="درباره"
                />
            }
        </>
    )
}
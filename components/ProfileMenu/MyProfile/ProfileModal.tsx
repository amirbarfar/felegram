import { CirclePlay, Gift, Pencil, Plus, X } from "lucide-react";
import Image from 'next/image';
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
            <div className={`w-142 ${isOpen && !showGift && !showStory && !showEdit ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"} transition-opacity transform duration-300 ease-in-out rounded-lg bg-white dark:bg-zinc-800 flex-col flex max-h-[90vh] shadow-xl`}>
                <div className={`bg-shiri dark:bg-zinc-800 transition-all duration-500 ease-in-out overflow-hidden ${isScroll ? 'max-h-25 flex justify-between items-center pb-8' : 'max-h-65 pb-20'} rounded-t-lg`}>
                    <div className="flex gap-7 pt-7 px-7">
                        <X onClick={() => setIsOpen(false)} className="w-8 h-8 cursor-pointer stroke-[1.5] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100" />
                        <Pencil onClick={() => setShowEdit(true)} className="w-7 h-7 cursor-pointer stroke-[1.5] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100" />
                    </div>
                    <div className={`flex justify-center items-center ${isScroll ? "flex gap-2 px-7 mt-7 " : "flex-col"} -mt-7`}>
                        <div className="flex justify-center items-center shrink-0">
                            <div
                                className="relative rounded-full overflow-hidden border-2 border-my-blue bg-white dark:bg-zinc-900"
                                style={{ width: isScroll ? 64 : 120, height: isScroll ? 64 : 120 }}
                            >
                                <Image src="/test.png" alt="" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <h2 className={`text-2xl ${isScroll ? "text-lg" : ""} font-bold text-gray-900 dark:text-zinc-100`} >{data?.firstname} {data?.lastname}</h2>
                            <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                آنلاین
                            </span>
                        </div>
                    </div>
                </div>
                <div ref={scrollContainerRef} className="scrollbar sticky top-0 rounded-b-lg bg-shiri dark:bg-zinc-800 overflow-y-auto">
                    {data?.channel &&
                        <div className={`px-7 py-5 flex gap-3 bg-white dark:bg-zinc-900 ${isScroll ? "mt-30" : ""}`}>
                            <div className="relative w-18 h-18 rounded-full overflow-hidden shrink-0">
                                <Image src="/test.png" alt="" fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 mt-1 text-gray-900 dark:text-zinc-100">یادگیری همراه من</h3>
                                <p className="opacity-70 text-md text-gray-700 dark:text-zinc-300">این یک متن تستی است که به طور مثال داخل چنل قرار گرفته...</p>
                                <p className="text-lg mt-1 opacity-70 text-gray-700 dark:text-zinc-300">کانال . ۲۵ عضو</p>
                            </div>
                        </div>
                    }
                    <div className="bg-white dark:bg-zinc-900 py-5 px-7 text-lg flex flex-col gap-6">
                        {data?.phone && <ProfileInfoItem title={"موبایل"} content={data.phone} />}
                        {data?.bio && <ProfileInfoItem title={"درباره من"} content={data.bio} />}
                        {data?.username && <ProfileInfoItem title={"نام کاربری"} content={`@${data.username}`} />}
                        {data?.birthday && <ProfileInfoItem title={"تاریخ تولد"} content={<AgeSummary birthday={data.birthday} />} />}
                    </div>
                    <div className="mt-5 bg-white dark:bg-zinc-900 overflow-hidden">
                        <button onClick={() => setShowGift(true)} className="flex items-center gap-6 w-full px-7 py-4 mt-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 group">
                            <Gift className="w-8 h-8 stroke-[1.5] text-gray-500 dark:text-zinc-400" />
                            <p className="text-xl font-medium text-gray-700 dark:text-zinc-100">گیفت ها</p>
                        </button>
                        <button onClick={() => setShowStory(true)} className="flex items-center gap-6 w-full px-7 py-4 mb-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 group">
                            <CirclePlay className="w-8 h-8 stroke-[1.5] text-gray-500 dark:text-zinc-400" />
                            <p className="text-xl font-medium text-gray-700 dark:text-zinc-100">آرشیو استوری ها</p>
                        </button>
                    </div>
                    <div className="w-full cursor-pointer flex opacity-70 font-bold justify-center items-center py-5 px-7 text-gray-700 dark:text-zinc-300">
                        <button type="button" className="cursor-pointer">اضافه کردن آلبوم</button>
                        <Plus size={17} />
                    </div>
                    <div className="w-full px-7 py-5 flex justify-center items-center bg-white dark:bg-zinc-900 h-30">
                        <p className="text-gray-500 dark:text-zinc-500">هنوز هیچ آلبومی وجود نداره.</p>
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
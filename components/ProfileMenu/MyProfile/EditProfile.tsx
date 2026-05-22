import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import ProfileEditInfoItem from "./ProfileEditInfoItem";
import Account from "../AccountSection/Index";
import EditProfileModal from "./EditProfileModal";
import { api } from "@/utils/api";
import { formatBirthday } from "@/hooks/useUserAgeSummary";
import { useUserProfile } from "@/hooks/useUserProfile";
import { FieldKey } from "@/lib/types/ProfileFieldTypes";
import { getBasicInfoItems, getExtraInfoItems } from "./profileItems";

interface EditProfileProps {
  onClose: () => void;
  onBack: () => void;
  content: string;
}

export default function EditProfile({ onClose, onBack, content }: EditProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editTtile, setEditTitle] = useState<FieldKey>("name")
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const { data, setData, setRefreshKey } = useUserProfile();
  const [bio, setBio] = useState("");

  const maxLen = 70

  const handleBioSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLen) {
      setBio(value)
    }
  }

  useEffect(() => {
    if (data?.bio) {
      setBio(data.bio);
    }
  }, [data]);

  useEffect(() => {
    if (!bio) return;
    const timer = setTimeout(async () => {
      try {
        await api('/api/profile/edit', {
          method: 'PUT',
          body: JSON.stringify({ bio }),
        });
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error("خطا در آپدیت بیو:", error);
      }
    }, 800);

    setBio(bio)
    setData(prev => prev ? { ...prev, bio } : prev)

    return () => clearTimeout(timer);
  }, [bio]);

  if (!data) {
    return null;
  }

  const result = data?.birthday ? formatBirthday(data.birthday) : null;

  const handleFileClick = () => fileInputRef.current?.click();

  return (
    <Modal onClose={onClose} padding={false}>
      <div className="relative max-h-[92vh] overflow-y-auto scrollbar w-140 bg-shiri dark:bg-zinc-800 rounded-xl shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 p-4 border-b border-gray-200 dark:border-zinc-800">
          <div className='flex items-center'>
            <button onClick={onClose} className="p-2 cursor-pointer transition-colors text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-100">
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
            <h2 className="text-xl px-2 text-gray-900 dark:text-zinc-100 font-light">{content}</h2>
          </div>
          <button onClick={onBack} className="p-2 cursor-pointer transition-colors text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-100">
            <ArrowLeft className="w-8 h-8 stroke-[1.5]" />
          </button>
        </div>
        <div className="bg-white dark:bg-zinc-900 w-full">
          <div className="flex justify-center flex-col items-center py-6">
            <input type="file" className="hidden" accept="image/*" ref={fileInputRef} />
            <div onClick={handleFileClick} className="cursor-pointer">
              <div className="relative w-30 h-30 rounded-full overflow-hidden border-2 border-my-blue bg-white dark:bg-zinc-900">
                <Image src="/test.png" alt="Profile" fill className="object-cover" />
              </div>
            </div>
            <div className="mt-4 w-full flex justify-center items-center flex-col gap-1">
              <h2 className={`text-xl font-bold text-center text-gray-900 dark:text-zinc-100`} >{data.firstname} {data.lastname}</h2>
              <span className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium border border-green-100 dark:border-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                آنلاین
              </span>
            </div>
          </div>
          <div className="px-7 py-4 text-xl flex justify-between gap-6">
            <input
              onChange={handleBioSize}
              value={bio}
              type="text"
              placeholder="درباره من"
              className="border-none outline-0 w-full bg-transparent text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500"
            />
            <p className="opacity-70 text-gray-600 dark:text-zinc-400">{maxLen - bio.length}</p>
          </div>
        </div>
        <div className="px-7 py-3 text-lg opacity-70 text-gray-600 dark:text-zinc-400">
          <p>هر چیزی که مربوط به تو میشه، مثل سن یا شهر.</p>
          <p>به طور مثال: امیرعلی ۲۳ ساله از تهران.</p>
        </div>
        <div className="mt-1 bg-white dark:bg-zinc-900 w-full py-3 flex flex-col">
          {getBasicInfoItems(data).map((item, index) => (
            <ProfileEditInfoItem
              key={index}
              title={item.title}
              content={item.content}
              icon={item.icon}
              setEditTitle={setEditTitle}
              setIsOpen={() => setIsOpenEditModal(true)}
            />
          ))}
        </div>
        <div className="px-7 py-3 text-lg opacity-70 text-gray-600 dark:text-zinc-400">
          <p>با نام کاربری افراد دیگه میتونن پیدا کنن بدون اون دیگران باید شماره تماس تو رو داشته باشن.</p>
        </div>
        <div className="mt-1 bg-white dark:bg-zinc-900 w-full py-3 flex flex-col">
          {getExtraInfoItems(data, result).map((item, index) => (
            <ProfileEditInfoItem
              key={index}
              title={item.title}
              content={item.content}
              icon={item.icon}
              setEditTitle={setEditTitle}
              setIsOpen={() => setIsOpenEditModal(true)}
            />
          ))}
        </div>
        <div className="bg-white dark:bg-zinc-900 w-full mt-5 py-1 pl-1">
          <Account isOpen={true} />
        </div>
      </div>
      {
        isOpenEditModal &&
        <div>
          <EditProfileModal
            onClose={() => setIsOpenEditModal(false)}
            title={editTtile}
            data={data}
            setData={setData}
            setRefreshKey={setRefreshKey}
          />
        </div>
      }
    </Modal>
  );
}
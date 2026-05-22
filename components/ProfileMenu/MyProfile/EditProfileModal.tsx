import { api } from "@/utils/api";
import React, { useState } from "react";
import { FieldKey, fieldKeyToFa } from "@/lib/types/ProfileFieldTypes";
import Modal from "@/components/Modal";

interface EditProfileModalProps {
    onClose: () => void;
    title: FieldKey;
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditProfileModal({ onClose, title, data, setData, setRefreshKey }: EditProfileModalProps) {

    const formStructure: Record<FieldKey, any[]> = {
        name: [
            { id: "firstname", label: "نام", type: "text", example: "محمد", value: data.firstname },
            { id: "lastname", label: "نام خانوادگی", type: "text", example: "توحیدی", value: data.lastname }
        ],
        phone: [
            { id: "phone", label: "شماره تلفن", type: "tel", example: "۰۹۱۲۳۸۰۹۰۸۰", value: data.phone }
        ],
        username: [
            { id: "username", label: "نام کاربری", type: "text", example: "mohamad", value: data.username }
        ],
        channel: [
            { id: "channel", label: "آدرس کانال", type: "text", example: "test", value: data.channel }
        ],
        birthday: [
            { id: "birthday", label: "تاریخ تولد", type: "text", example: "۱۳۷۰/۰۱/۰۱", value: data.birthday }
        ]
    };

    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initialData: Record<string, string> = {};

        if (title && formStructure[title]) {
            formStructure[title].forEach(field => {
                initialData[field.id] = field.value || "";
            });
        }
        return initialData;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await api('/api/profile/edit', {
                method: 'PUT',
                body: JSON.stringify(formData)
            })
            setData((prev: any) => ({ ...prev, ...formData }));
            setRefreshKey(prev => prev + 1);
        } catch (error) {
            console.error(error);
        }
        onClose();
    };

    if (!formStructure[title]) return null;

    return (
        <Modal onClose={onClose}>
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-zinc-100">{fieldKeyToFa[title]}</h2>
                </div>

                <div className="p-6 space-y-6 flex flex-col gap-2">
                    {formStructure[title].map((field) => (
                        <div key={field.id} className="flex w-full justify-start flex-col text-xl group items-start mt-2">
                            <label
                                htmlFor={field.id}
                                className="group-focus-within:text-my-blue mb-2 opacity-70 transition-colors cursor-pointer text-gray-600 dark:text-zinc-400"
                            >
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                name={field.id}
                                type={field.type}
                                minLength={field.id === 'phone' ? 11 : 50}
                                maxLength={field.id === 'phone' ? 11 : 50}
                                value={formData[field.id] || ""}
                                onChange={handleChange}
                                placeholder={field.example}
                                className={`peer ${field.id === "firstname" || field.id === "lastname" ? 'text-right' : 'text-left'} text-lg border-b pb-1 focus:border-b-my-blue border-b-gray-300 dark:border-zinc-700 w-full outline-0 transition-colors bg-transparent text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500`}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end px-6 pb-6 gap-3">
                    <button onClick={handleSave} className="px-5 py-2.5 text-lg cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-my-blue dark:text-zinc-100 transition-colors font-medium">تایید</button>
                    <button onClick={onClose} className="px-5 py-2.5 text-lg cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-zinc-400 transition-colors font-medium">انصراف</button>
                </div>
            </div>
        </Modal>
    );
}
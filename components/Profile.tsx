'use client';

import { api } from '@/utils/api';
import { useState, ChangeEvent } from 'react';
import { useToast } from '../hooks/useToast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    lastName: string;
}

export default function Profile({ phone }: any) {
    const { setMessage } = useToast();
    const { setRefreshKey } = useUserProfile();
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        lastName: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleForm = async () => {
        if (!formData.name) {
            setMessage('نام الزامی است.')
        }

        const res = await api('/api/profile/add', {
            method: 'POST',
            body: JSON.stringify({
                firstname: formData.name,
                lastname: formData.lastName,
                phone
            })
        })

        if (res.success) {
            setMessage('با موفقیت وارد شدید.')
            setRefreshKey(prev => prev + 1);
            router.push('/');
        } else {
            setMessage(res.error || 'خطا در ذخیره اطلاعات');
        }
    }

    return (
        <div className="w-full flex items-center justify-center" dir="rtl">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:border-my-blue/30">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-right">
                    تکمیل پروفایل
                </h2>
                <p className="text-gray-500 font-light text-sm mb-8 text-right"> لطفاً اطلاعات خود را وارد کنید تا حساب شما کامل شود.</p>
                <form onSubmit={(e) => { e.preventDefault(), handleForm() }} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full px-0 py-2 bg-transparent border-b border-gray-300 focus:border-my-blue outline-none text-gray-700 font-light placeholder-transparent transition-colors"
                        />
                        <label className="absolute right-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-my-blue font-light">
                            نام
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full px-0 py-2 bg-transparent border-b border-gray-300 focus:border-my-blue outline-none text-gray-700 font-light placeholder-transparent transition-colors"
                        />
                        <label className="absolute right-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-my-blue font-light">
                            نام خانوادگی
                        </label>
                    </div>
                    <div className="flex gap-4 mt-8 pt-2">
                        <button type="submit" className="flex-1 py-2.5 rounded-lg cursor-pointer bg-my-blue text-white font-light hover:bg-opacity-90 transition-colors"> تایید</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
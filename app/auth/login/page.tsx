'use client'
import { useToast } from '@/hooks/useToast';
import { useUserProfile } from '@/hooks/useUserProfile';
import Profile from '@/components/Profile';
import { api } from '@/utils/api';
import { persionToEnglish } from '@/utils/persianToEnglish';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [authStatus, setAuthStatus] = useState(false)

  const router = useRouter()
  const { setRefreshKey } = useUserProfile()
  const { setMessage } = useToast()

  const handleSendCode = async (e: any) => {
    e.preventDefault();

    if (!phoneNumber) {
      setMessage('شماره موبایل الزامی است.')
      return;
    }
    const changNumber = persionToEnglish(phoneNumber)
    setPhoneNumber(changNumber);
    setIsLoading(true);

    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: changNumber })
      });
      setMessage('کد به صورت موفق به شماره شما ارسال شد.');
      setAuthStatus(data.isNewUser)
      setStep(2);
    } catch (error: any) {
      setMessage(error.message || 'خطایی رخ داد.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      setMessage('کد الزامی است.')
      return;
    }

    setIsLoading(true);

    const fullCode = persionToEnglish(code.join(""));
    

    try {
      await api('/api/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ phone: phoneNumber, code: fullCode, authStatus })
      });
      if (!authStatus) {
        setRefreshKey(prev => prev + 1);
        router.push('/')
        setMessage('با موفقیت وارد شدین.')
      } else {
        setStep(3)
      }
    } catch (error: any) {
      setMessage(error.message || 'کد ۶ رقمی اشتباه است.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [step])


  const handleInputChange = (index: number, value: any) => {
    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const newCode = [...code]

    if (e.key === 'Backspace') {
      if (!newCode[index]) {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        newCode[index] = ""
        setCode(newCode)
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100  items-center justify-center p-6 font-sans" dir="rtl">
      {step === 1 || step === 2 ? (
        <div className="w-full max-w-5xl h-150 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative transition-colors duration-300">
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center z-10">
            <h1 className="text-3xl font-bold text-gray-900  mb-2 text-right transition-colors duration-300">
              {step === 1 ? 'ورود به فلگرام' : 'کد تایید'}
            </h1>
            <p className="text-gray-500 font-light text-lg mb-8 text-right transition-colors duration-300">
              {step === 1
                ? 'شماره موبایل خود را وارد کنید.'
                : `کد ۴ رقمی ارسال شده به ${phoneNumber} را وارد کنید.`}
            </p>

            <form onSubmit={step === 1 ? handleSendCode : handleVerifyCode} className="space-y-6">
              {step === 1 && (
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2 text-right transition-colors duration-300">شماره موبایل</label>
                  <input
                    type="tel"
                    maxLength={11}
                    minLength={11}
                    placeholder="09149901287"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-5 py-3 font-light bg-white border-gray-300 rounded-lg focus:border-my-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>
              )}

              {step === 2 && (
                <div dir='ltr' className="flex justify-center gap-3 mb-4">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={code[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-10 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-my-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-300 dark:placeholder-zinc-500"
                      placeholder="_"
                    />
                  ))}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || (step === 2 && code.length < 4)}
                className={`w-full py-3 rounded-lg cursor-pointer font-bold text-white shadow-md transition-transform active:scale-95
                ${isLoading || (step === 2 && code.length < 4)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-my-blue hover:bg-[#1d6aa8]'
                  }`}
              >
                {isLoading ? 'در حال بررسی...' : (step === 1 ? 'ورود' : 'تایید')}
              </button>
            </form>
          </div>

          <div className="md:flex w-1/2 max-md:w-full max-md:h-full bg-myblfrom-my-blue items-center justify-center relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-linear-to-br from-my-blue to-[#1a5fa8] opacity-95"></div>
            <div className="relative z-10 text-center text-white px-6 max-md:justify-center max-md:h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-3">
                {step === 1 ? 'سلام خوش اومدی!' : 'بریم شروع کنیم؟'}
              </h2>
              <p className="text-blue-100 font-light leading-relaxed text-lg">
                {step === 1
                  ? 'برای شروع، شماره موبایل خود را وارد کنید. اگر قبلاً عضو نباشید، اکانت شما به صورت خودکار ساخته می‌شود.'
                  : 'کد تایید را وارد کنید تا وارد حساب خود شوید.'}
              </p>
            </div>
            <div className="flex absolute -left-20 -top-30 justify-center items-center mt-6 opacity-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="400"
                height="400"
                viewBox="0 0 24 24"
                fill="white"
                stroke="none"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <Profile phone={phoneNumber}/>
      )}
      </div>
  );
};

export default AuthPage;
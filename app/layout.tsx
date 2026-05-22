import type { Metadata } from "next";
import { Providers } from '@/hooks/theme/Providers'
import "./globals.css";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: 'Felegram | فلگرام',
  description: 'دقیقاً همون تجربه‌ای که دوستش داری! چت فوری، تماس بی‌وقفه، کانال‌های بی‌نهایت و گروه‌های امن. فلگرام یعنی تلگرام، بدون هیچ محدودیتی. همین الان شروع کن.',
  keywords: ['تلگرام', 'فلگرام', 'پیام‌رسان', 'چت', 'تماس صوتی', 'کانال', 'گروه', 'واتساپ', 'پیام‌رسانی سریع', 'امنیت'],

  openGraph: {
    title: 'فلگرام | نسخه دیگه تلگرام ',
    description: 'همه امکانات تلگرام رو اینجا پیدا می‌کنی. پیام‌رسانی سریع، امنیت بالا، و رابط کاربری آشنا. دیگه نیازی به تغییر نیست، فقط نامش عوض شده.',
    url: 'https://your-domain.com',
    siteName: 'فلگرام',
    images: [
      {
        url: '/telegram-clone-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'فلگرام - همان تلگرام',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },

  themeColor: '#2481cc',
  icons: {
    icon: '/favicon-telegram-blue.ico',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="font-bold">
      <body className="bg-[#fdfaf3] dark:bg-neutral-950">
        <Providers>
          <Toast />
          {children}
        </Providers>
      </body>
    </html>
  );
}

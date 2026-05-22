import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/schemas';
import { verifyToken } from '@/utils/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = loginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
        }

        const { phone } = parsed.data;

        const existingAccount = await prisma.account.findUnique({
            where: { phone },
            include: { user: true }
        });

        let userId: string;
        let isNewUser = false;

        const code = Math.floor(Math.random() * 900000 + 100000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        if (existingAccount && existingAccount.user) {
            userId = existingAccount.user.id;

            await prisma.otpCode.deleteMany({ where: { userId } });
            await prisma.otpCode.create({ data: { code, expiresAt, userId } });
            isNewUser = false;
        } else {
            const token = await verifyToken();

            if (token) {
                const randomName = Math.round(100000 + Math.random() * 100000);
                await prisma.account.create({
                    data: { firstname: 'کاربر', lastname: `کاربر_${randomName}`, phone, userId: token.userId, isVerified: false }
                });
                await prisma.otpCode.create({ data: { code, expiresAt, userId: token.userId } });
                userId = token.userId;
                isNewUser = true;
            } else {
                const newUser = await prisma.user.create({
                    data: { otpCodes: { create: { code, expiresAt } } }
                });
                await prisma.account.create({
                    data: { firstname: 'کاربر', lastname: `${Math.round(100000 + Math.random() * 100000)}`, phone, userId: newUser.id, isVerified: false }
                });
                userId = newUser.id;
                isNewUser = true;
            }
        }

        console.log('OTP Code:', code);
        return NextResponse.json({ success: true, message: 'کد تایید ارسال شد', isNewUser });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'خطا در ارسال کد' }, { status: 500 });
    }
}

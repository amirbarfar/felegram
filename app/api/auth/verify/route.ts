import { prisma } from "@/lib/prisma";
import { verifySchema } from "@/lib/schemas";
import { signToken } from "@/utils/jwt";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { phone, code } = parsed.data;

    const account = await prisma.account.findFirst({
        where: { phone },
        include: { user: true }
    });

    if (!account || !account.user) {
        return NextResponse.json({ error: "کاربری یافت نشد" }, { status: 404 });
    }

    const userId = account.user.id;

    const otpCodeUser = await prisma.otpCode.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });

    if (!otpCodeUser) {
        return NextResponse.json({ error: 'کد تایید یافت نشد' }, { status: 404 });
    }

    if (new Date() > otpCodeUser.expiresAt) {
        return NextResponse.json({ error: 'کد منقضی شده است' }, { status: 400 });
    }

    if (otpCodeUser.code !== code) {
        return NextResponse.json({ error: 'کد اشتباه است' }, { status: 401 });
    }

    await prisma.otpCode.delete({ where: { id: otpCodeUser.id } });

    await prisma.account.update({ where: { phone }, data: { isVerified: true } });

    await prisma.account.updateMany({
        where: { userId: account.user.id, phone: { not: phone } },
        data: { isActive: false }
    });

    const device = (await headers()).get("user-agent") || "unknown";
    const userSession = await prisma.session.create({
        data: { accountId: account.phone, sessionToken: '', deviceIdentifier: device, isValid: true }
    });

    const token = await signToken({ phone: account.phone, userId: account.user.id, sessionId: userSession.id });

    await prisma.session.update({
        where: { id: userSession.id },
        data: { sessionToken: token }
    });

    return NextResponse.json({ success: true, message: "ورود موفقیت آمیز بود" });
}

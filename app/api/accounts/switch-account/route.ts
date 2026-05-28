import { prisma } from "@/lib/prisma";
import { switchAccountSchema } from "@/lib/schemas";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = switchAccountSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { phone } = parsed.data;

    const account = await prisma.account.findFirst({
        where: { phone },
        include: { user: true }
    });

    if (!account) {
        return NextResponse.json({ error: "اکانت پیدا نشد." }, { status: 404 });
    }

    const lastSession = await prisma.session.findFirst({
        where: { accountId: phone },
        orderBy: { createdAt: "desc" }
    });

    try {
        if (!lastSession || !lastSession.sessionToken) {
            throw new Error();
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(lastSession.sessionToken, secret);
    } catch (error) {
        await prisma.account.update({
            where: { phone },
            data: { isVerified: false }
        });

        return NextResponse.json({ error: "توکن منقضی شده است." }, { status: 401 });
    }

    await prisma.account.updateMany({
        where: { 
            userId: account.user.id,
            NOT: { phone }
        },
        data: { isActive: false }
    });

    await prisma.account.update({
        where: { phone },
        data: { isActive: true }
    });

    const cookieStore = await cookies();
    cookieStore.set("token", lastSession.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
    });

    return NextResponse.json({ success: "اکانت با موفقیت تغییر کرد." }, { status: 200 });
}
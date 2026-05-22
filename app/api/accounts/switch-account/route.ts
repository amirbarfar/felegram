import { prisma } from "@/lib/prisma";
import { switchAccountSchema } from "@/lib/schemas";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
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
        return NextResponse.json({ error: "اکانت پیدا نشد.", status: 404 });
    }

    await prisma.account.updateMany({
        where: { userId: account.user.id },
        data: { isActive: false }
    });

    await prisma.account.update({ where: { phone }, data: { isActive: true } });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: account.user.id, phone: account.phone })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime("7d")
        .setIssuedAt()
        .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
    });

    return NextResponse.json({ success: "اکانت با موفقیت تغییر کرد.", status: 201 });
}

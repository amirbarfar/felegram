import { prisma } from "@/lib/prisma";
import { profileAddSchema } from "@/lib/schemas";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = profileAddSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { firstname, lastname, phone } = parsed.data;

    const updateAccount = await prisma.account.update({
        where: { phone },
        data: { firstname, lastname }
    });

    if (!updateAccount) {
        return NextResponse.json({ error: 'اکانتی وجود ندارد' }, { status: 404 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ phone, userId: updateAccount.userId })
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

    return NextResponse.json({ success: "true" }, { status: 200 });
}

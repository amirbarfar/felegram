import { prisma } from "@/lib/prisma";
import { jwtVerify, SignJWT } from "jose";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export interface CustomJwtPayload {
    sessionId: any;
    userId: string;
    phone?: string;
}

export async function verifyToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret) as { payload: CustomJwtPayload };
        return payload;
    } catch (error) {
        return null;
    }
}

export async function signToken(payload: {
    userId: string;
    phone: string;
    sessionId : string;
}) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
        userId: payload.userId,
        phone: payload.phone,
        sessionId : payload.sessionId
    })
        .setProtectedHeader({ alg: "HS256" })
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

    return token;
}

export async function deleteToken(payload: { phone: string , sessionId : string }) {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    const device = (await headers()).get("user-agent") || "unknown";

    await prisma.session.deleteMany({
        where: {
            id : payload.sessionId,
            accountId: payload.phone,
            deviceIdentifier: device,
        }
    })
}
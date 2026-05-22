import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ messgae: 'توکنی وجود نداره' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        const { payload } = await jwtVerify(token, secret)
        return NextResponse.json({ authenticated: true, user: payload });
    } catch (error) {
        console.error("Auth Error:", error);
        return NextResponse.json({ message: "توکن نامعتبر یا منقضی شده است" }, { status: 401 });
    }
}
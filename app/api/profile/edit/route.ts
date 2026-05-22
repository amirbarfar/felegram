import { prisma } from "@/lib/prisma";
import { profileEditSchema } from "@/lib/schemas";
import { verifyToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = profileEditSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
        }

        const token = await verifyToken();
        if (!token?.phone) {
            return NextResponse.json({ error: 'عدم دسترسی یا توکن نامعتبر' }, { status: 401 });
        }

        if (Object.keys(parsed.data).length === 0) {
            return NextResponse.json({ error: 'دیتا ارسالی خالی است' }, { status: 400 });
        }

        const updatedAccount = await prisma.account.update({
            where: { phone: token.phone },
            data: parsed.data,
        });

        return NextResponse.json({ success: true, data: updatedAccount });

    } catch (error: any) {
        console.error("Update Error:", error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'حسابی با این مشخصات یافت نشد' }, { status: 404 });
        }
        return NextResponse.json({ error: 'خطا در بروزرسانی سرور' }, { status: 500 });
    }
}

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await verifyToken();

    if (!user || !user.phone) {
        return NextResponse.json({ error: "لاگین نیست یا شماره در توکن یافت نشد" }, { status: 401 });
    }

    const userId = user.userId;
    const userAgent = req.headers.get("user-agent") || "unknown";

    const accounts = await prisma.account.findMany({
        where: {
            userId: userId,
            isVerified: true,
            sessions: {
                some: {
                    deviceIdentifier : userAgent,
                    isValid : true
                }
            }
        },
        include: { user: true },
        orderBy: {
            isActive: 'desc'
        }
    });

    return NextResponse.json({ accounts });
}
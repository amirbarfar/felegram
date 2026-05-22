import { prisma } from "@/lib/prisma";
import { verifyToken, signToken } from "@/utils/jwt";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    const token = await verifyToken();

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const device = (await headers()).get("user-agent") || "unknown";
    const otherSessions = await prisma.session.findFirst({
        where: {
            deviceIdentifier: device,
            isValid: true,
            account: {
                userId: token.userId,
            }
        },
        include: {
            account: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (otherSessions) {
        await signToken({
            userId: otherSessions.account.userId,
            phone: otherSessions.account.phone,
            sessionId: otherSessions.id
        });

        await prisma.session.delete({
            where: {
                id: token.sessionId,
            },
        });

        return NextResponse.json({
            switched: true,
            account: otherSessions.account.phone,
        });
    }

    await prisma.session.delete({
        where: {
            id: token.sessionId,
        },
    });

    (await cookieStore).delete("token");

    return NextResponse.json({
        switched: false,
    });
}
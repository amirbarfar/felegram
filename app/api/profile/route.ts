import { prisma } from "@/lib/prisma"
import { CustomJwtPayload, verifyToken } from "@/utils/jwt";
import { NextResponse } from "next/server"

export const GET = async () => {

    const user = await verifyToken();

    if (!user) {
        return NextResponse.json({ error: "لاگین نیست" }, { status: 401 });
    }
    const phone = user.phone;

    const account = await prisma.account.findUnique({
        where: { phone },
        include: { user: true }
    })

    if (!account) {
        return NextResponse.json(
            { error: "اکانت الزامی است" },
            { status: 400 }
        );
    }

    return NextResponse.json({ account })
}
import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const { data: session } = await auth.getSession()

    if (!session?.user) {
        redirect('/')
    }

    const periods = await getHistoryPeriods(session.user.id)
    return Response.json(periods)
}

export type getHistoryPeriodsResponseType = Awaited<ReturnType<typeof getHistoryPeriods>>

async function getHistoryPeriods(userId: string) {
    const result = await prisma.monthHistory.findMany({
        where: {
            userId,
        },
        select: {
            year: true,
        },
        distinct: ["year"],
        orderBy: [
            {
                year: "asc",
            },
        ],
    });

    const years = result.map((el) => el.year);
    if (years.length === 0) {
        return [new Date().getFullYear()]
    }

    return years
}
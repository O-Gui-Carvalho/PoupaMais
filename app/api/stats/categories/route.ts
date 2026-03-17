import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const { data: session } = await auth.getSession()

    if(!session?.user) {
        redirect('/')
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")

    const queryParams = OverviewQuerySchema.safeParse({ from, to })
    if (!queryParams.success) {
        throw new Error(queryParams.error.message)
    }

    const stats = await getCategoriesStats(
        session.user.id,
        queryParams.data.from,
        queryParams.data.to,
    )

    return Response.json(stats)
}

export type getCategoriesStatsResponseType = Awaited<ReturnType<typeof getCategoriesStats>>

async function getCategoriesStats(userId: string, from: Date, to: Date) {
    const stats = await prisma.transaction.groupBy({
        by: ["type", "category"],
        where: {
            userId,
            date: {
                gte: from,
                lte: to,
            },
        },
        _sum: {
            amount: true,
        },
        orderBy: {
            _sum: {
                amount: "desc",
            }
        }
    })

    return stats;
}
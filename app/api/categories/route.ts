import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import z from "zod";

export async function GET(request: Request) {
    const { data: session } = await auth.getSession();
      
    if (!session?.user) {
        redirect ('/')
    }

    const { searchParams } = new URL(request.url)
    const paramType = searchParams.get("type")

    const validator = z.enum(["expense", "income"]).nullable()
    const queryParams = validator.safeParse(paramType)

    if (!queryParams.success) {
        return Response.json(queryParams.error, {
            status: 400,
        })
    }

    const type = queryParams.data
    const categories = await prisma.category.findMany({
        where: {
            userId: session.user.id,
            ...(type && { type }),
        },
        orderBy: {
            name: "asc"
        }
    })

    return Response.json(categories)
}
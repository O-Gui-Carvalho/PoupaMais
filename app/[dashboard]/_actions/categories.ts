'use server'

import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
    const parsedBody = CreateCategorySchema.safeParse(form)
    if (!parsedBody.success) {
        throw new Error("Bad request")
    }
    const { data: session } = await auth.getSession();

    if (!session?.user) {
        redirect('/')
    }

    const { name, type } = parsedBody.data
    return await prisma.category.create({
        data: {
            userId: session.user.id,
            name,
            type
        },
    })
}

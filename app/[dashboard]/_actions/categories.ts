'use server'

import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType, DeleteCategorySchema, DeleteCategorySchemaType } from "@/schema/categories";
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

export async function DeleteCategory(form: DeleteCategorySchemaType) {
    const parsedBody = DeleteCategorySchema.safeParse(form)
    if (!parsedBody.success) {
        throw new Error("Bad request")
    }
    const { data: session } = await auth.getSession();

    if (!session?.user) {
        redirect('/')
    }

    return await prisma.category.delete({
        where: {
            name_userId_type: {
                userId: session.user.id,
                name: parsedBody.data.name,
                type: parsedBody.data.type,
            }
        }
    })
}
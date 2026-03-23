'use server'

import { auth } from "@/lib/auth/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function DeleteTransaction(id: string) {
    const { data: session } = await auth.getSession()

    if (!session?.user) {
        redirect('/')
    }

    const transaction = await prisma.transaction.findUnique({
        where: {
            userId: session.user.id,
            id,
        }
    })

    if (!transaction) {
        throw new Error("Transação não encontrada")
    }

    await prisma.$transaction([
        prisma.transaction.delete({
            where: {
                id,
                userId: session.user.id,
            }
        }),
        prisma.monthHistory.update({
            where: {
                day_month_year_userId: {
                    userId: session.user.id,
                    day: transaction.date.getUTCDate(),
                    month: transaction.date.getUTCMonth(),
                    year: transaction.date.getUTCFullYear(),
                },
            },
            data: {
                ...(transaction.type === "expense" && {
                    expense: {
                        decrement: transaction.amount,
                    }
                }),
                ...(transaction.type === "income" && {
                    income: {
                        decrement: transaction.amount,
                    }
                })
            }
        }),
        prisma.yearHistory.update({
            where: {
                month_year_userId: {
                    userId: session.user.id,
                    month: transaction.date.getUTCMonth(),
                    year: transaction.date.getUTCFullYear(),
                },
            },
            data: {
                ...(transaction.type === "expense" && {
                    expense: {
                        decrement: transaction.amount,
                    }
                }),
                ...(transaction.type === "income" && {
                    income: {
                        decrement: transaction.amount,
                    }
                })
            }
        })
    ])
}
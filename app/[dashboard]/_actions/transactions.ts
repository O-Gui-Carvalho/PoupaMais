'use server'

import { auth } from '@/lib/auth/server'
import prisma from '@/lib/prisma'
import { CreateTransactionSchema, CreateTransactionSchemaType } from '@/schema/transaction'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form)
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message)
  }

  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/")
  }
  
  const { amount, category, date, description, type } = parsedBody.data
  const categoryRow = await prisma.category.findFirst({
    where: {
        userId: session.user.id,
        name: category
    }
  })

  if (!categoryRow) {
    throw new Error("category not found")
  }

  await prisma.$transaction([
    prisma.transaction.create({
        data: {
            userId: session.user.id,
            amount,
            date,
            description: description || "",
            type,
            category: categoryRow.name
        },
    }),

    prisma.monthHistory.upsert({
        where: {
            day_month_year_userId: {
                userId: session.user.id,
                day: date.getUTCDate(),
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
            },
        },
        create: {
            userId: session.user.id,
            day: date.getUTCDate(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            expense: type === "expense" ? amount : 0,
            income: type === "income" ? amount : 0,
        },
        update: {
            expense: {
                increment: type === "expense" ? amount : 0,
            },
            income: {
                increment: type === "income" ? amount : 0,
            },
        },
    }),

    prisma.yearHistory.upsert({
        where: {
            month_year_userId: {
                userId: session.user.id,
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
            },
        },
        create: {
            userId: session.user.id,
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            expense: type === "expense" ? amount : 0,
            income: type === "income" ? amount : 0,
        },
        update: {
            expense: {
                increment: type === "expense" ? amount : 0,
            },
            income: {
                increment: type === "income" ? amount : 0,
            },
        },
    }),
  ]);
}

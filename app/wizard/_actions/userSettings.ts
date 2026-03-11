"use server"

import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schema/userSettings"
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({
    currency,
  })

  if (!parsedBody.success) {
    throw parsedBody.error
  }

  const { data: session } = await auth.getSession();
  if (!session?.user) {
    redirect("/")
  }

  const userSettings = await prisma.userSetting.update({
    where: {
        userId: session.user.id,
    },
    data: {
        currency,
    }
  })

  return userSettings
}

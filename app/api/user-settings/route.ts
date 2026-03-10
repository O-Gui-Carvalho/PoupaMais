import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function GET() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  let userSettings = await prisma.userSetting.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!userSettings) {
    userSettings = await prisma.userSetting.create({
      data: {
        userId: session.user.id,
        currency: "BRL",
      },
    });
  }

  return Response.json(userSettings);
}
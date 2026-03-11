import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return Response.json({ error: "Unauthenticated" }, { status: 401 });
  }

  let userSettings = await prisma.userSetting.findUnique({
    where: { userId: session.user.id },
  });

  if (!userSettings) {
    userSettings = await prisma.userSetting.create({
      data: {
        userId: session.user.id,
        currency: "BRL",
      },
    });
  }

  revalidatePath("/dashboard")
  return Response.json(userSettings);
}

export async function POST(request: Request) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return Response.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await request.json();

  const userSettings = await prisma.userSetting.upsert({
    where: { userId: session.user.id },
    update: {
      ...(body.currency && { currency: body.currency }),
      ...(body.firstName !== undefined && { firstName: body.firstName }),
      ...(body.lastName !== undefined && { lastName: body.lastName }),
    },
    create: {
      userId: session.user.id,
      currency: body.currency ?? "USD",
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
    },
  }); 
  
  return Response.json(userSettings);
}
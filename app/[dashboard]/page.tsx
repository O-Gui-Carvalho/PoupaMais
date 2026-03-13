import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { CreateTransactionDialog } from './_components/CreateTransactionDialog';

export default async function page() {
    const { data: session } = await auth.getSession();
  
    if (!session?.user) {
        redirect ('/')
    }

    const userSettings = await prisma.userSetting.findUnique({
      where: {
        userId: session.user.id
      }
    })

    if (!userSettings) {
      redirect("/wizard")
    }

    const firstName = userSettings?.firstName || session.user.name?.split(' ')[0] || 'usuário'

  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container px-8 mx-auto flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">
            Olá, {firstName}
          </p>

          <div className="flex items-center gap-3">
            <CreateTransactionDialog 
              trigger={
                <Button variant={"default"} className='border border-emerald-500 bg-emerald-950
                text-white hover:bg-emerald-700 hover:text-white cursor-pointer'>
                  Novo Crédito
                </Button>
              }
              type='income'
            />

            <CreateTransactionDialog
              trigger={
                <Button variant={"default"} className='border border-rose-500 bg-rose-950
                text-white hover:bg-rose-700 hover:text-white cursor-pointer'>
                  Novo Débito
                </Button>
              }
              type='expense'
            />
            
          </div>
        </div>
      </div>
    </div>
  )
}

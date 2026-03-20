'use client'

import CurrencyComboBox from '@/components/CurrencyComboBox'
import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionType } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import CreateCategoryDialog from '../_components/CreateCategoryDialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Category } from '@/lib/generated/prisma/client'
import DeleteCategoryDialog from '../_components/DeleteCategoryDialog'

export default function page() {
  return (
    <>
        {/*Header*/}
        <div className="border-b bg-card">
            <div className="container flex mx-auto p-8 flex-wrap items-center justify-between gap-6">
                <div>
                    <p className="text-3xl font-bold">Gerenciar</p>
                    <p className="text-muted-foreground">
                        Gerencie suas configurações e categorias
                    </p>
                </div>
            </div>
        </div>

        <div className="container mx-auto flex flex-col gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Moeda</CardTitle>
                    <CardDescription>
                        Defina sua moeda principal para transações.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <CurrencyComboBox />
                </CardContent>
            </Card>

            <CategoryList type="income" />
            <CategoryList type="expense" />
        </div>
    </>
  )
}

function CategoryList({ type }: { type: TransactionType }) {
    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json()),
    })

    const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

    return (
        <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center justify-between gap-2'>
                        <div className="flex items-center gap-2">
                            {type === 'expense' ? (
                                <TrendingDown className='h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500' />
                            ) : (
                                <TrendingUp className='h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500' />
                            )}

                            <div>
                                Categorias de {type === "income" ? "Crédito" : "Débito"}
                                <div className="text-sm text-muted-foreground">
                                    Ordenado por nome
                                </div>
                            </div>
                        </div>

                        <CreateCategoryDialog 
                            type={type} 
                            successCallback={() => categoriesQuery.refetch()} 
                            trigger={
                                <Button className='gap-2 text-sm cursor-pointer'>
                                    <PlusSquare className='h-4 w-4' />
                                    Criar categoria
                                </Button>
                            }
                        />
                    </CardTitle>
                </CardHeader>

                <Separator />

                {
                    !dataAvailable && (
                        <div className="flex h-40 w-full flex-col items-center justify-center">
                            <p>
                                Nenhum{" "}
                                <span className={cn(
                                    "m-1",
                                    type === "income" ? "text-emerald-500" : "text-red-500"
                                )}>
                                    {type === 'income' ? 'Crédito' : 'Débito'}
                                </span>
                                {" "}criado.
                            </p>
                            <p className='text-sm text-muted-foreground'>Crie um para iniciar.</p>
                        </div>
                    )
                }

                {
                    dataAvailable && (
                        <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {categoriesQuery.data.map((category: Category) => (
                                <CategoryCard category={category} key={category.name} />
                            ))}
                        </div>
                    )
                }
            </Card>
        </SkeletonWrapper>
    )
}

function CategoryCard({category}: { category: Category }) {
    return (
        <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/10 dark:shadow-white/10">
            <div className="flex flex-col items-center gap-2 p-4">
                <span>{category.name}</span>
            </div>
            <DeleteCategoryDialog 
                category={category}
                trigger={
                    <Button className='flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20' variant={'secondary'}>
                        <TrashIcon className='h-4 w-4' />
                        Excluir
                    </Button>
                }
            />
        </div>
    )
}
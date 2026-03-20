'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Category } from '@/lib/generated/prisma/client';
import { TransactionType } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { toast } from 'sonner';
import { DeleteCategory } from '../_actions/categories';

interface Props {
    trigger: ReactNode;
    category: Category;
}

export default function DeleteCategoryDialog({ category, trigger }: Props) {
    const categoryIdentifier = `${category.name}-${category.type}`
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteCategory,
        onSuccess: async () => {
            toast.success("Categoria deletada com sucesso!", {
                id: categoryIdentifier,
            })

            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            })
        },
        onError: () => {
            toast.error("Algo deu errado", {
                id: categoryIdentifier,
            })
        }
    })
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja apagar essa categoria?</AlertDialogTitle>
                <AlertDialogDescription>Essa ação não poderá ser desfeita!</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        toast.loading("Deletando categoria...", {
                            id: categoryIdentifier,
                        })
                        deleteMutation.mutate({
                            name: category.name,
                            type: category.type as TransactionType,
                        })
                    }}
                >
                    Continuar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

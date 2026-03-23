'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DeleteTransaction } from '../_actions/deleteTransaction';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;
}

export default function DeleteTransactionDialog({ open, setOpen, transactionId }: Props) {
  const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteTransaction,
        onSuccess: async () => {
            toast.success("Transação deletada com sucesso!", {
                id: transactionId,
            })

            await queryClient.invalidateQueries({
                queryKey: ["transactions"],
            })
        },
        onError: () => {
            toast.error("Algo deu errado", {
                id: transactionId,
            })
        }
    })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja apagar essa transação?</AlertDialogTitle>
                <AlertDialogDescription>Essa ação não poderá ser desfeita!</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        toast.loading("Deletando transação...", {
                            id: transactionId,
                        })
                        deleteMutation.mutate(transactionId)
                    }}
                >
                    Continuar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

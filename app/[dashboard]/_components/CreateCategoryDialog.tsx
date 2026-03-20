'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusSquare } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateCategory } from "../_actions/categories";
import { Category } from "@/lib/generated/prisma/client";
import { toast } from "sonner";

interface Props {
    type: TransactionType;
    successCallback: (category: Category) => void;
    trigger?: ReactNode;
}

export default function CreateCategoryDialog({ type, successCallback, trigger }: Props) {
    const [open, setOpen] = useState(false)
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type,
        }
    })

    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data: Category) => {
            form.reset({
                name: "",
                type,
            })

            toast.success(`Categoria ${data.name} criada com sucesso!`, {
                id: "create-category",
            })

            successCallback(data)

            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            })

            setOpen((prev) => !prev)
        },

        onError: () => {
            toast.error("Algo deu errado", {
                id: "create-category"
            })
        }
    })

    const onSubmit = useCallback((values: CreateCategorySchemaType) => {
        toast.loading("Creating category...", {
            id: "create-category"
        })
        mutate(values)
    }, [mutate])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {trigger ? ( trigger ) : <Button variant={'ghost'} className="flex border-separate items-center justify-start rounded-sm border-b px-3 py-3 text-muted-foreground cursor-pointer">
                <PlusSquare className="mr-2 h-4 w-4"/>
                Criar nova
            </Button>}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Criar{" "}
                    <span className={cn(
                        "m-1",
                        type === "income" ? "text-emerald-500" : "text-red-500"
                    )}>
                        {type === "income" ? "crédito" : "débito"}
                    </span>
                </DialogTitle>
                <DialogDescription>
                    Categorias são usadas para agrupar transações
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Categoria" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    É assim que sua categoria aparecerá no app
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        
            <DialogFooter>
                <DialogClose asChild>
                    <Button 
                        type="button"
                        variant={"secondary"}
                        onClick={() => {
                            form.reset()
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogClose>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                    {!isPending && "Criar"}
                    {isPending && <Loader2 className="animate-spin" />}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

'use client'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { ReactNode, useCallback, useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "./CategoryPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateTransaction from "../_actions/transactions";
import { toast } from "sonner";
import { DateToUTCDate } from "@/lib/helpers";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
}

export function CreateTransactionDialog({ trigger, type }: Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        },
    })

    const [open, setOpen] = useState(false)

    const handleCategoryChange = useCallback((value: string) => {
            form.setValue("category", value)
        }, 
        [form]
    )

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: CreateTransaction,
        onSuccess: () => {
            toast.success("Transação criada com sucesso!", {
                id: "create-transaction",
            })

            form.reset({
                type,
                description: "",
                amount: 0,
                date: new Date(),
                category: undefined,
            })

            queryClient.invalidateQueries({
                queryKey: ['overview'],
            })

            setOpen((prev) => !prev)
        }
    })

    const onSubmit = useCallback((values: CreateTransactionSchemaType) => {
        toast.loading("Criando transações...", {id: "create-transaction"})

        mutate({
            ...values,
            date: DateToUTCDate(values.date),
        })
    }, [mutate])
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Crie um novo {" "}
                        <span className={cn(
                            "m-1",
                            type === "income" ? "text-emerald-500" : "text-red-500"
                        )}>
                            {type === 'income' ? 'crédito' : 'débito'}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form action="" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        Descrição da transação
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={0} {...field} type="number"/>
                                    </FormControl>
                                    <FormDescription>
                                        Valor da transação
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between gap-2">
                            <FormField 
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Categoria</FormLabel>
                                        <FormControl>
                                            <CategoryPicker type={type}  onChange={handleCategoryChange}/>
                                        </FormControl>
                                        <FormDescription>
                                            Categoria da transação
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Data da Transação</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button 
                                                        variant={"outline"} 
                                                        className={cn(
                                                            "w-50 pl-3 text-left font-normal", 
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Selecione a data</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(value) => {
                                                        if (!value) return
                                                        field.onChange(value)
                                                    }}
                                                    autoFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Selecione a data da transação
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
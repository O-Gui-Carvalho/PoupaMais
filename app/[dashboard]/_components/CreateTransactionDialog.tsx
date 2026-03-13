'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { ReactNode } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "./CategoryPicker";

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
    
    return (
        <Dialog>
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
                    <form action="" className="space-y-4">
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
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <FormControl>
                                            <CategoryPicker type={type} />
                                        </FormControl>
                                        <FormDescription>
                                            Categoria da transação
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
'use client'

import { useState } from "react"
import { authClient } from "@/lib/auth/client"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const inputStyles = "bg-background border border-input rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
    
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        // Chama o método de login por email do Neon Auth
        const { error } = await authClient.signIn.email({
            email,
            password,
        })

        if (error) {
            setError(error.message || "Credenciais inválidas. Tente novamente.")
            setIsPending(false)
        } else {
            // Se der sucesso, redireciona para a página logada
            router.push("/dashboard") 
        }
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input 
                type="email" 
                id="email"
                name="email"
                placeholder="email@exemplo.com"
                className={inputStyles}
                required
            />
        </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="password" title="Senha" className="text-sm font-medium text-foreground">Senha</label>
            <input 
                type="password" 
                id="password"
                name="password"
                placeholder="••••••••"
                className={inputStyles}
                required
            />
        </div>

        {/* Exibe a mensagem de erro da Neon Auth */}
        {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center">
                {error}
            </div>
        )}

        <button
            type="submit" 
            disabled={isPending}
            className="mt-2 bg-primary text-primary-foreground font-semibold rounded-lg p-2 hover:bg-primary/90 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
        >
            {isPending ? 'Entrando...' : 'Entrar'}
        </button>
    </form>
  )
}

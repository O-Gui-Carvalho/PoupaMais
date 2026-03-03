'use client'

import { useActionState } from "react"

export default function LoginForm() {
    const inputStyles = "bg-background border border-input rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
    const [state, action, isPending] = useActionState(LoginForm, null)

  return (
    <form action="" className="flex flex-col gap-4">
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

        {/* Mensagem de erro */}
        {/*{state?.message && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center">
                {state.message}
            </div>
        )}*/}

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

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { authClient } from '@/lib/auth/client'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const inputStyles = "bg-background border border-input rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-ring transition-all"

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Cria a conta usando a API da Neon Auth
    const { error } = await authClient.signUp.email({
        name,
        email,
        password,
    })

    if (error) {
        setError(error.message || "Falha ao criar conta.")
        setIsPending(false)
    } else {
        router.push("/dashboard")
    }
  }
  
  return (
    <section className="flex min-h-dvh">
        {/* Lado Esquerdo - Imagem (reutilizada) */}
        <div className="relative hidden w-1/2 md:flex">
            <Image 
                src="/login-banner-1.jpg"
                alt="Login background"
                fill
                priority
                className='object-cover'
            />
            <div className="absolute mt-8 ml-8">
                <Image src="poupa-mais-dark.svg" alt="TrackMyRiffs Logo" width={82} height={40}/>
            </div>
        </div>

        {/* Lado Direito - Formulário de Cadastro */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-sm flex flex-col gap-6">
                <header className="space-y-1 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Crie sua conta</h1>
                    <p className="text-muted-foreground">Organize suas finanças hoje.</p>
                </header>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Nome</label>
                        <input 
                            type="text"
                            id='name'
                            name='name'
                            placeholder='Seu nome'
                            className={inputStyles}
                            required 
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className='text-sm font-medium text-foreground'>Email</label>
                        <input 
                            type="email" 
                            id='email'
                            name='email'
                            placeholder='email@exemplo.com'
                            className={inputStyles}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" title='Senha' className='text-sm font-medium text-foreground'>Senha</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Mínimo 8 caracteres'
                            className={inputStyles}
                            required
                            minLength={8} 
                        />
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <button 
                        type='submit' 
                        disabled={isPending}
                        className="mt-2 bg-primary text-primary-foreground font-semibold rounded-lg p-2 hover:bg-primary/90 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                    Já tem uma conta?{' '}
                    <Link href='/' className='text-foreground font-medium hover:underline underline-offset-4'>
                        Faça login
                    </Link>
                </div>

            </div>
        </div>
    </section>
  )
}

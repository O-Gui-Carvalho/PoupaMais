import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
  const inputStyles = "bg-[#1A1A1A] border border-[#404040] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all"
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
                    <h1 className="text-4xl font-bold tracking-tight">Crie sua conta</h1>
                    <p className="text-neutral-400">Organize suas finanças hoje.</p>
                </header>

                <form action="" className='flex flex-col gap-4'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium">Nome</label>
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
                        <label htmlFor="email" className='text-sm font-medium'>Email</label>
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
                        <label htmlFor="password" title='Senha' className='text-sm font-medium'>Senha</label>
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

                    <button type='submit' className="mt-2 bg-neutral-200 text-neutral-900 font-semibold rounded-lg p-2 hover:bg-neutral-400 transition-colors duration-300 cursor-pointer">
                        Cadastrar
                    </button>
                </form>

                <div className="text-center text-sm text-neutral-500">
                    Já tem uma conta?{' '}
                    <Link href='/' className='text-white hover:underline underline-offset-4'>
                        Faça login
                    </Link>
                </div>

            </div>
        </div>
    </section>
  )
}

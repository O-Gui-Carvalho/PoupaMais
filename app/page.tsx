import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";

export default function Home() {
  return (
    <section className="flex min-h-dvh">
      {/* Lado Esquerdo - Imagem */}
      <div className="relative hidden w-1/2 md:flex">
        <Image 
          src="/login-banner-1.jpg"
          alt="Login Background"
          fill
          priority
          className="object-cover"
        />

        {/* Logo PoupaMais */}
        <div className="absolute mt-8 ml-8">
          <Image 
            src="/poupa-mais-dark.svg"
            alt="PoupaMais logo"
            width={82}
            height={40}
          />
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col gap-6">
          
          {/*Cabeçalho */}
          <header className="space-y-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Bem Vindo(a)</h1>
            <p className="text-muted-foreground">Faça login</p>
          </header>

          <LoginForm />

          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href={"/signup"} className="text-foreground font-medium hover:underline underline-offset-4">
              Cadastre-se
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-border"/>
            <span className="text-sm text-muted-foreground whitespace-nowrap">Ou continue com</span>
            <hr className="flex-1 border-border"/>
          </div>

          <GoogleButton />

        </div>
      </div>
    </section>
  );
}

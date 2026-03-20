'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import Logo from './Logo'

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavBar />
    </>
  )
}

const items = [
  { label: "Painel", link: '/dashboard' },
  { label: "transações", link: '/dashboard/transactions' },
  { label: "Gerenciar", link: '/dashboard/manage' },
]

function MobileNavBar() {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className='border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-100 sm:w-135 p-8' side='left'>
            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
            <SheetDescription className="sr-only">
              Navegue pelas páginas do aplicativo PoupaMais.
            </SheetDescription>
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem 
                  key={item.label} 
                  link={item.link} 
                  label={item.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-20 min-h-15 items-center gap-x-4">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          {/* Button with user image */}
        </div>
      </nav>
    </div>
  )
}

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8 mx-auto">
        <div className="flex h-20 min-h-15 items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem 
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          {/* Button with user image */}
        </div>
      </nav>
    </div>
  )
}

function NavbarItem({ link, label, clickCallback }: { link: string; label: string; clickCallback?: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === link || pathname.startsWith(`${link}/`)

  return (
    <div className="relative flex h-full items-center">
      <Link 
        href={link} 
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground", 
          isActive && "text-foreground"
        )}
        onClick={() => clickCallback && clickCallback()}
      >
        {label}
      </Link>
      {
        isActive && (
          <div className="absolute bottom-0 left-1/2 hidden h-0.5 w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
        )
      }
    </div>
  )
}
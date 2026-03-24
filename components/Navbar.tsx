"use client"
import { ModeToggle } from "./ModeToggle"
import Link from "next/link"
import { SheetNav } from "./SheetNav"
import { navLinks } from "@/data/nav-links"
import { BookText } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className='h-16 w-full max-w-8xl mx-auto border-b-2 border-primary flex justify-between items-center px-4'>
      <Link href='/' className='flex items-center gap-2'>
        <BookText className='text-primary max-md:hidden' size={32} />
        <h1 className='text-xl md:text-2xl font-bold '>E-Biblioteka</h1>
      </Link>
      <div className='flex items-center gap-4'>
        <div className='hidden md:flex items-center gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 hover:text-primary transition-colors delay-300 rounded-md p-2",
                pathname === link.href && "bg-primary/20 dark:bg-primary/80",
              )}
            >
              {link.icon}
              <span className='text-sm font-medium'>{link.label}</span>
            </Link>
          ))}
        </div>
        <Show when='signed-out'>
          <SignInButton>
            <Button
              variant='outline'
              className=' p-2 rounded-md cursor-pointer border-2 border-green-500 hover:border-green-500/60 transition-colors delay-300'
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              variant='outline'
              className=' p-2 rounded-md cursor-pointer border-2 border-blue-500 hover:border-blue-500/60 transition-colors delay-300'
            >
              Sign Up
            </Button>
          </SignUpButton>
        </Show>
        <Show when='signed-in'>
          <UserButton />
        </Show>
        <SheetNav />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar

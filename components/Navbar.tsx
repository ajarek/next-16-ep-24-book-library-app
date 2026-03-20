"use client"
import { ModeToggle } from "./ModeToggle"
import Link from "next/link"
import { SheetNav } from "./SheetNav"
import { navLinks } from "@/data/nav-links"
import { BookText } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className='h-16 w-full max-w-8xl mx-auto border-b-2 border-primary flex justify-between items-center px-4'>
      <Link href='/' className='flex items-center gap-2'>
        <BookText className='text-primary' size={32} />
        <h1 className='text-2xl font-bold '>E-Biblioteka</h1>
      </Link>
      <div className='flex items-center gap-4'>
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn('flex items-center gap-2 hover:text-primary transition-colors delay-300 rounded-md p-2', pathname === link.href && 'bg-primary/20 dark:bg-primary/80')}
            >
              {link.icon}
              <span className='text-sm font-medium'>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="md:hidden ">

        <SheetNav />
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar

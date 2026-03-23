import { BookOpenText, Home, Plus, Library } from "lucide-react"

export const navLinks = [
  { href: "/", label: "Strona główna", icon: <Home /> },
  { href: "/catalogs", label: "Katalogi", icon: <BookOpenText /> },
  { href: "/add-book", label: "Dodaj książkę", icon: <Plus /> },
  { href: "/library", label: "Biblioteka", icon: <Library /> },

]
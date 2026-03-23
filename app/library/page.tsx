"use client"

import { useUser } from '@clerk/nextjs'
import { useBooks } from '@/store/booksStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const LibraryPage = () => {
  const { user } = useUser()
  const { items } = useBooks()
  const userBooks = items.filter((book) => book.user_id === user?.id)
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start p-8 gap-4'>
      <h1 className='text-2xl font-bold'>Moja Biblioteka</h1>
      
      {userBooks.length === 0 ? (
        <>
        <p className='text-xl font-medium text-destructive'>Nie masz jeszcze żadnych książek</p>
        <Link href="/add-book">
          <Button size="lg" className='rounded-md cursor-pointer'>Dodaj książkę</Button>
        </Link>
        </>
      ) : (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {userBooks.map((book, index) => (
          <Card key={index} className='w-full shadow-xl p-4' style={{ backgroundColor: book.cover_color }}>
            <Link href={book.url} target='_blank'>
              <CardHeader className="relative  h-[460px] w-full ">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className='w-full h-full object-cover shadow-lg rounded-lg'
                  loading="eager"
                />
              </CardHeader>

              <CardContent>
                <CardTitle className='text-xl font-bold text-white mt-2'>
                  {book.author}
                </CardTitle>
                <CardDescription className='text-lg font-semibold text-white'>
                  {book.genre}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        
      ))}
      </div>
    )}
    </div>
  )
}

export default LibraryPage
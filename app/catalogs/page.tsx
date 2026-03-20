import { Button } from '@/components/ui/button'
import { bookGenres } from '@/data/book-genres'
import Link from 'next/link'
import React from 'react'

const CatalogsPage = () => {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start p-4 gap-4'>
      <div className='max-w-8xl mx-auto flex justify-between items-center gap-2'>
        <h1 className='text-3xl '>Odkryj naszą kolekcję</h1>
      </div>
      <div className='max-w-8xl mx-auto flex justify-between items-center gap-2'>
        <p className='text-xl  font-medium '>Przeglądaj i wypożyczaj książki z naszej kolekcji</p>
      </div>
      <div className='max-w-8xl mx-auto flex flex-wrap justify-center items-center gap-2'>
        {bookGenres.map((genre) => (
          <Button key={genre} asChild className='text-xl w-40 h-12 cursor-pointer rounded-lg'>
            <Link href={`/catalogs/${genre}`}>
              {genre}
            </Link>
          </Button>
        ))}
      </div>
      
    </div>
  )
}

export default CatalogsPage

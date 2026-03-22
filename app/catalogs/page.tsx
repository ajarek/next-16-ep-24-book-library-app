"use client"
import { Button } from "@/components/ui/button"
import { bookGenres } from "@/data/book-genres"
import Link from "next/link"
import Books from "@/data/books.json"
import { useBooks } from "@/store/booksStore"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"


const CatalogsPage = () => {
  const { items } = useBooks()
  const [selectedGenre, setSelectedGenre] = useState("Wszystkie")
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start p-8 gap-4'>
      <div className='max-w-8xl mx-auto flex justify-between items-center gap-2'>
        <h1 className='text-3xl '>Odkryj naszą kolekcję</h1>
      </div>
      <div className='max-w-8xl mx-auto flex justify-between items-center gap-2'>
        <p className='text-xl  font-medium '>
          Przeglądaj i wypożyczaj książki z naszej kolekcji
        </p>
      </div>
      <div className='w-full max-w-8xl  flex flex-wrap justify-center items-center gap-2'>
        {bookGenres.map((genre) => (
          <Button
            key={genre}
            className='text-xl w-40 h-12 cursor-pointer rounded-lg'
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>
      <h3 className='text-2xl font-bold'>
        {selectedGenre}{" "}
        {
          Books.filter(
            (book) =>
              selectedGenre === "Wszystkie" || book.genre === selectedGenre,
          ).length
        }
      </h3>
      <div className='w-full max-w-8xl grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 place-items-center '>
        {items.filter(
          (book) =>
            selectedGenre === "Wszystkie" || book.genre === selectedGenre,
        ).map((book, index) => (
          <Card key={index} className='w-full shadow-xl p-4' style={{ backgroundColor: book.cover_color }}>
            <Link href={book.url} target='_blank'>
              <CardHeader className="relative  h-[509px] w-full ">
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
                <CardTitle className='text-xl font-bold text-white'>
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
    </div>
  )
}

export default CatalogsPage

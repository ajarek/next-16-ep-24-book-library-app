"use client"

import { bookGenres } from "@/data/book-genres"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Book } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBooks } from "@/store/booksStore"
import { BookType } from "@/types/typeBook"
import { useUser } from "@clerk/nextjs"

const formSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany."),
  url: z.string().min(1, "URL jest wymagany."),
  cover_color: z.string().min(1, "Kolor okładki jest wymagany."),
  author: z.string().min(1, "Autor jest wymagany."),
  cover: z.string().min(1, "Okładka jest wymagana."),
  genre: z.string().min(1, "Gatunek jest wymagany."),
})

const AddBooksForm = () => {
  const { user } = useUser()
  const { addItemToRecords } = useBooks()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      cover_color: "#000000",
      author: "",
      cover: "",
      genre: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const record: BookType = {
      title: data.title,
      url: data.url,
      cover_color: data.cover_color,
      author: data.author,
      cover: data.cover,
      genre: data.genre,
      user_id: user?.id,
    }
    addItemToRecords(record)
    toast.success("Książka została dodana pomyślnie!", {
      position: "top-right",
    })
    form.reset()
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 '>
          <span className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground'>
            <Book />
          </span>{" "}
          <span className='text-3xl text-primary'>Dodaj Książkę</span>
        </CardTitle>
        <CardDescription>Wpisz dane książki.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-title'>Tytuł</FieldLabel>
                  <Input
                    {...field}
                    type='text'
                    id='form-rhf-demo-title'
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                    placeholder='Wpisz tytuł książki'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='author'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-author'>Autor</FieldLabel>
                  <Input
                    {...field}
                    type='text'
                    id='form-rhf-demo-author'
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                    placeholder='Podaj autora książki'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='genre'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className='w-full max-w-xs'>
                  <FieldLabel htmlFor='form-rhf-select-category'>
                    Gatunek
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id='form-rhf-select-category'
                      aria-invalid={fieldState.invalid}
                      className='min-w-[120px]'
                    >
                      <SelectValue placeholder='Wybierz kategorię' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {bookGenres.map((genre, index) => (
                          <SelectItem key={index} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name='cover_color'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-date'>
                    Kolor okładki
                  </FieldLabel>
                  <Input
                    {...field}
                    type='color'
                    id='form-rhf-demo-date'
                    aria-invalid={fieldState.invalid}
                    placeholder='Wybierz kolor okładki'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='cover'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-cover'>
                    URL Okładki
                  </FieldLabel>
                  <Input
                    {...field}
                    type='text'
                    id='form-rhf-demo-cover'
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                    placeholder='Wklej link do okładki książki'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='url'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-url'>URL</FieldLabel>
                  <Input
                    {...field}
                    type='text'
                    id='form-rhf-demo-url'
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                    placeholder='Wklej URL książki'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button
            type='submit'
            form='form-rhf-demo'
            className='w-full h-10 bg-primary text-lg text-primary-foreground hover:bg-primary/90 cursor-pointer'
          >
            Dodaj książkę
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default AddBooksForm

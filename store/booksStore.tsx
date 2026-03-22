import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { BookType } from "@/types/typeBook"
import books from "@/data/books.json"

type BookState = {
  items: BookType[]
  addItemToRecords: (item: BookType) => void
  removeItemFromRecords: (title: string) => void
  removeAllFromRecords: () => void
}

export const useBooks = create<BookState>()(
  persist(
    (set) => ({
      items: [...books],

      addItemToRecords: (item: BookType) =>
        set((state) => ({
          items: [item, ...state.items],
        })),

      removeItemFromRecords: (title) =>
        set((state) => ({
          items: state.items.filter((item) => item.title !== title),
        })),

      removeAllFromRecords: () => set({ items: [] }),
    }),

    {
      name: "books",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

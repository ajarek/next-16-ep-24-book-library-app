import { create } from "zustand"
import type { BookType } from "@/types/typeBook"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"

type BookState = {
  items: BookType[]
  initialized: boolean
  init: () => void
  addItemToRecords: (item: BookType) => Promise<void>
  removeItemFromRecords: (title: string) => Promise<void>
}

export const useBooks = create<BookState>()((set, get) => ({
  items: [],
  initialized: false,

  init: () => {
    if (get().initialized) return
    set({ initialized: true })

    const q = collection(db, "books")
    onSnapshot(q, (snapshot) => {
      const items: BookType[] = []
      snapshot.forEach((doc) => {
        items.push(doc.data() as BookType)
      })
      set({ items })
    })
  },

  addItemToRecords: async (item: BookType) => {
    await addDoc(collection(db, "books"), item)
  },

  removeItemFromRecords: async (title: string) => {
    const q = query(collection(db, "books"), where("title", "==", title))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (document) => {
      await deleteDoc(document.ref)
    })
  },
}))

if (typeof window !== "undefined") {
  useBooks.getState().init()
}

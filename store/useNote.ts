import { GenNoteID } from "@/lib/genNoteId"
import { SaveNotes } from "@/server/SaveNotes"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface NoteStore {
	id: string
	title: string
	note: string
	saving: boolean
    error: boolean
	setId: () => void
	setNewId: () => void
	setTitle: (title: string) => void
	setNote: (note: string) => void
	saveToDB: () => Promise<void>
	clearNote: () => void
}

export const useNoteStore = create(
	persist<NoteStore>(
		(set) => ({
			id: "",
			title: "",
			note: "",
			saving: false,
            error: false,
			setId: async () => {
				if (useNoteStore.getState().id === "") {
					await GenNoteID().then((id) => {
						set({ id })
					})
				}
			},
			setNewId: async () => {
				await GenNoteID().then((id) => {
					set({ id })
				})
			},
			setTitle: (title: string) => set({ title }),
			setNote: (note: string) => set({ note }),
			saveToDB: async () => {
				set({ saving: true })
				await SaveNotes(
					useNoteStore.getState().id,
					useNoteStore.getState().title,
					useNoteStore.getState().note
				).then(() => {
                    set({ saving: false })
                    set({ error: false })
                }).catch(() => {
                    set({ saving: false })
                    set({ error: true })
                })
			},
			clearNote: () => set({ title: "", note: "" }),
		}),
		{
			name: "note",
		}
	)
)

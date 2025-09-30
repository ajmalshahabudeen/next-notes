import { GenNoteID } from "@/lib/genNoteId"
import { SaveNotes } from "@/server/SaveNotes"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface NoteStore {
	id: string
	title: string
	note: string
	saving: boolean
	saved: boolean
	error: boolean
	notAuth: boolean
	setId: () => void
	setNewId: () => void
	setTitle: (title: string) => void
	setNote: (note: string) => void
	saveToDB: () => Promise<void>
	clearNote: () => void
	loadFromHistory: (id: string, title: string, note: string) => void
}

export const useNoteStore = create(
	persist<NoteStore>(
		(set) => ({
			id: "",
			title: "",
			note: "",
			saving: false,
			saved: false,
			error: false,
			notAuth: false,
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
				)
					.then((r) => {
						switch (r.status) {
							case 200:
								set({ saving: false })
								set({ saved: true })
								set({ error: false })
								set({ notAuth: false })
								setTimeout(() => {
									set({ saved: false })
								}, 2000)
								break
							case 401:
								set({ saving: false })
								set({ notAuth: true })
								set({ error: false })
								setTimeout(() => {
									set({ notAuth: false })
								}, 5000)
								break
							case 500:
								set({ saving: false })
								set({ error: true })
								set({ notAuth: false })
								setTimeout(() => {
									set({ error: false })
								}, 5000)
								break
						}
					})
					.catch(() => {
						set({ saving: false })
						set({ error: true })
					})
			},
			clearNote: () => set({ title: "", note: "" }),
			loadFromHistory: (id: string, title: string, note: string) => {
				set({ id: id, title: title, note: note })
			},
		}),
		{
			name: "note",
		}
	)
)

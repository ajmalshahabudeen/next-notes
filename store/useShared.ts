import { GenNoteID } from "@/lib/genNoteId"
import { SaveSharedNotes } from "@/server/SaveNotes"
import { SharedNote } from "@/server/SharedNotes"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SharedNoteStore {
	id: string
	title: string
	note: string
	saving: boolean
	saved: boolean
	error: boolean
	notAuth: boolean
	sharedNoteID: string
	sharedNoteLoading: boolean
	sharedNotError: boolean
	editable: boolean
	isPrivate: boolean
	setId: () => void
	setNewId: () => void
	setTitle: (title: string) => void
	setNote: (note: string) => void
	saveToDB: () => Promise<void>
	clearNote: () => void
	loadFromHistory: (id: string, title: string, note: string) => void
	loadFromShared: (id: string) => Promise<void>
}

export const useSharedNoteStore = create(
	persist<SharedNoteStore>(
		(set) => ({
			id: "",
			title: "",
			note: "",
			saving: false,
			saved: false,
			error: false,
			notAuth: false,
			sharedNoteID: "",
			sharedNoteLoading: false,
			sharedNotError: false,
			editable: false,
			isPrivate: false,
			setId: async () => {
				if (useSharedNoteStore.getState().id === "") {
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
				await SaveSharedNotes(
					useSharedNoteStore.getState().id,
					useSharedNoteStore.getState().sharedNoteID,
					useSharedNoteStore.getState().title,
					useSharedNoteStore.getState().note
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
			loadFromShared: async (id: string) => {
				set({ sharedNoteLoading: true })
				await SharedNote(id)
					.then((r) => {
						switch (r.status) {
							case 200:
								set({ id: r.data?.note.id as string })
								set({ sharedNoteID: r.data?.id as string })
								set({ title: r.data?.note.title as string })
								set({ note: r.data?.note.note as string })
								set({ isPrivate: r.data?.isPrivate as boolean })
								set({ editable: r.data?.editable as boolean })
								set({ sharedNoteLoading: false })
								set({ sharedNotError: false })
								break
							case 500:
								set({ sharedNoteLoading: false })
								set({ sharedNotError: true })
								break
						}
					})
					.catch(() => {
						set({ sharedNoteLoading: false })
						set({ sharedNotError: true })
					})
			},
		}),
		{
			name: "shared-note",
		}
	)
)

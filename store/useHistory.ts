import { GetHistory } from "@/server/History"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type HistoryType = {
	note: string
	id: string
	title: string
	userId: string
	createdAt: Date
	updatedAt: Date
}[]

interface HistoryStore {
	history: HistoryType
	loading: boolean
	error: boolean
	getHistory: () => Promise<void>
}

export const useHistoryStore = create(
	persist<HistoryStore>(
		(set) => ({
			history: [],
			loading: false,
			error: false,
			getHistory: async () => {
				set({ loading: true })
				await GetHistory().then((r) => {
					switch (r.status) {
						case 200:
							set({ history: r.data as HistoryType })
							set({ loading: false })
							break
						case 401:
							set({ error: false })
							set({ loading: false })
							break
						case 500:
							set({ error: true })
							set({ loading: false })
							setTimeout(() => {
								set({ error: false })
							}, 3000)
							break
					}
				})
			},
		}),
		{
			name: "history",
		}
	)
)

import { GetSession } from "@/server/GetSession"
import { Session } from "next-auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SessionStore {
    session: Session | null
    getSession: () => Promise<void>
    clearSession: () => void
}

export const useSessionStore = create(
    persist<SessionStore>(
        (set) => ({
            session: null,
            getSession: async() => {
                await GetSession().then((session) => {
                    set({ session })
                })
            },
            clearSession: () => set({ session: null }),
        }),
        {
            name: "session",
        }
    )
    
)

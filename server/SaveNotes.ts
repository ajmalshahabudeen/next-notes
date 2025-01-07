"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma/prisma"

export const SaveNotes = async (id: string, title: string, note: string) => {
	const session = await auth()
	if (!session) return

	const userId = session.user?.id as string

	let newTitle = title
	if (title.length === 0) newTitle = NoteTitleAutoGenerate()

	await prisma.note.upsert({
		where: {
			id,
		},
		update: {
			title: newTitle,
			note: note,
			updatedAt: new Date(),
		},
		create: {
			title: newTitle as string,
			note: note as string,
			userId,
			updatedAt: new Date(),
		},
	})
}

const NoteTitleAutoGenerate = () => {
	const RandomTitle = crypto.randomUUID()
	const Title = "Note " + RandomTitle.slice(0, 8)
	return Title
}

"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma/prisma"

export const SaveNotes = async (id: string, title: string, note: string) => {
	const session = await auth()
	if (!session) {
		console.log("Unauthorized")
		return {
			status: 401,
			message: "Unauthorized",
		}
	}

	const userId = session.user?.id as string

	let newTitle = title
	if (title.length === 0) newTitle = NoteTitleAutoGenerate()

	try {
		console.log("saving note with id:", id)
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
				id,
				title: newTitle as string,
				note: note as string,
				userId,
				updatedAt: new Date(),
			},
		})
		console.log("Note saved with id:", id)

		return {
			status: 200,
			message: "Note saved successfully",
		}

	} catch (error) {
		console.log(error)
		return {
			status: 500,
			message: "Error saving note",
		}
	}
}

const NoteTitleAutoGenerate = () => {
	const RandomTitle = crypto.randomUUID()
	const Title = "Note " + RandomTitle.slice(0, 8)
	return Title
}

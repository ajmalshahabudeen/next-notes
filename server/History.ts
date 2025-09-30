"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma/prisma"

export const GetHistory = async () => {
	const session = await auth()

	if (!session) {
		console.log("Unauthorized")
		return {
			status: 401,
			message: "Unauthorized",
			data: null,
		}
	}

	const userId = session.user?.id as string

	try {
		const history = await prisma.note.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: "desc",
			},
		})
		return {
			status: 200,
			message: "Success",
			data: history,
		}
	} catch (error) {
		console.log(error)
		return {
			status: 500,
			message: "Internal Server Error",
			data: null,
		}
	}
}

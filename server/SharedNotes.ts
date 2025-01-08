'use server'

// import { auth } from "@/auth"
import { prisma } from "@/prisma/prisma"

export const SharedNote = async (id:string) => {
    // const session = await auth()
    // if (!session) {
    //     console.log("Unauthorized")
    //     return {
    //         status: 401,
    //         message: "Unauthorized",
    //         data: null
    //     }
    // }

    // const userId = session.user?.id as string

    try {

        const sharedNote = await prisma.sharedNote.findUnique({
            where: {
                id,
            }, 
            include: {
                note: true,
            }
        })
        return {
            status: 200,
            message: "Success",
            data: sharedNote
        }

    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}
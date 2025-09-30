'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma/prisma"

export const SharedNote = async (id:string) => {
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
        console.log(sharedNote)
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

export const createSharedNote = async (id: string, editable: boolean, isPrivate: boolean) => {
        const session = await auth()
        console.log(id, editable, isPrivate)

        if (!session) {
            console.log("Unauthorized")
            return {
                status: 401,
                message: "Unauthorized",
                data: null
            }
        }

        // const userId = session.user?.id as string

        try {
            const sharedLink = await prisma.sharedNote.create({
                data: {
                    noteId: id,
                    editable,
                    isPrivate,
                }
            })
            const link = sharedLink.id
            return {
                status: 200,
                message: "Success",
                data: link
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
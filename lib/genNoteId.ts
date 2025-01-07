'use server'

export const GenNoteID = async() => {
    const id = crypto.randomUUID()
    return id
}
"use client"
import React, { use, useEffect } from "react"
import { CloudSync } from "@/components/interactive/cloud"
import { Textarea } from "@/components/ui/textarea"
import { useNoteStore } from "@/store/useNote"
import { AiOutlineLoading } from "react-icons/ai"
import { useSharedNoteStore } from "@/store/useShared"
import { RxLinkBreak2 } from "react-icons/rx";
import { useSessionStore } from "@/store/useSession"

const ShredNotePage = (props: { params: Promise<{ id: string }> }) => {
	const params = use(props.params)
	const id = params.id
	console.log(id)

	const saveNote = useNoteStore((state) => state.setNote)
	const saveToDB = useNoteStore((state) => state.saveToDB)
	const note = useNoteStore((state) => state.note)
	// const setId = useNoteStore((state) => state.setId)
	const loadFromShared = useSharedNoteStore((state) => state.loadFromShared)
	const sharedNoteLoading = useSharedNoteStore(
		(state) => state.sharedNoteLoading
	)
	const sharedNotError = useSharedNoteStore((state) => state.sharedNotError)
	const editable = useSharedNoteStore((state) => state.editable)
	const isPrivate = useSharedNoteStore((state) => state.isPrivate)
	const session = useSessionStore((state) => state.session)

	useEffect(() => {
		loadFromShared(id)
	}, [id, loadFromShared])

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// console.log(note)
		saveNote(e.target.value)
		saveToDB()
	}

	return (
		<section>
			<div className=''>
				<CloudSync />
				{sharedNoteLoading ? (
					<div className='flex justify-center items-center h-screen'>
						<AiOutlineLoading className='animate-spin' size={54} />
					</div>
				) : (sharedNotError || (!session && isPrivate)) ? (
					<div className='flex flex-col gap-3 justify-center items-center h-screen'>
                        <RxLinkBreak2 size={54} className="text-red-400"/>
                        <p className="text-2xl">Note not found</p>
                    </div>
				) : (
					<Textarea
						onChange={(e) => handleInput(e)}
						readOnly={!editable}
						value={note}
						autoSave='true'
						placeholder='Take a note...'
						className='min-h-screen ring-0 ring-transparent focus:ring-0 shadow-none border-none'
					/>
				)}
			</div>
		</section>
	)
}

export default ShredNotePage

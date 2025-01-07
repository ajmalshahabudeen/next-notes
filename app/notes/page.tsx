"use client"
import { Textarea } from "@/components/ui/textarea"
import { useNoteStore } from "@/store/useNote"
import { useEffect } from "react"

const NotePage = () => {
  const saveNote = useNoteStore((state) => state.setNote)
  const saveToDB = useNoteStore((state) => state.saveToDB)
  const note = useNoteStore((state) => state.note)
  const setId = useNoteStore((state) => state.setId)

  useEffect(() => {
    setId()
  }, [setId])

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// console.log(note)
    saveToDB()
    saveNote(e.target.value)
	}

	return (
		<section>
			<div className=''>
				<Textarea
					onChange={(e) => handleInput(e)}
					value={note}
          autoSave="true"
          placeholder="Take a note..."
					className='min-h-screen ring-0 ring-transparent focus:ring-0 shadow-none border-none'
				/>
			</div>
		</section>
	)
}

export default NotePage

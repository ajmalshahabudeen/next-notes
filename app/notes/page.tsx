"use client"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const NotePage = () => {
	const [note, setNote] = useState("")

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value)
		console.log(note)
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

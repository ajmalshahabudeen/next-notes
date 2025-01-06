"use client"
import SignIn from "@/components/Buttons/sign-in"
import { Button } from "@/components/ui/button"
import { useSessionStore } from "@/store/useSession"
import { useEffect } from "react"
import { TypeAnimation } from "react-type-animation"

export default function Home() {
	const session = useSessionStore((state) => state.session)
	const getSession = useSessionStore((state) => state.getSession)
	useEffect(() => {
		getSession()
	}, [getSession])

	return (
		<div className='flex flex-col h-screen items-center justify-center'>
			<div className='absolute top-10'>
				<p className='font-bold uppercase text-2xl border-b border-black px-4 border-dashed'>
					Next NoteBook
				</p>
			</div>
			{session && (
				<div className='absolute bottom-20'>
					<Button size={"lg"}>Create Note</Button>
				</div>
			)}
			{!session && (
				<div className='absolute bottom-20 inline-flex gap-2 items-center'>
					<Button size={"lg"}>Create Note</Button>
					or
					<SignIn />
				</div>
			)}
			<TypingAnimation />
		</div>
	)
}

const TypingAnimation = () => {
	return (
		<div className='text-center text-4xl md:text-7xl px-5'>
			<TypeAnimation
				sequence={[
					// Same note content at the start will only be typed out once, initially
					"Welcome to your Note-Taking App!",
					1000, // wait 1s before replacing "Note-Taking App" with "Personal Notes"
					"Start organizing your Personal Notes",
					1000,
					"Create a To-Do List for today",
					1000,
					"Make sure to jot down any ideas or reminders",
					1000,
				]}
				wrapper='span'
				speed={50}
				style={{ display: "inline-block" }}
				repeat={Infinity}
			/>
		</div>
	)
}

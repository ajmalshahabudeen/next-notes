"use client"
import { TypeAnimation } from "react-type-animation"

export default function Home() {
	return (
		<div className="flex h-screen items-center justify-center">
			<TypingAnimation />
		</div>
	)
}

const TypingAnimation = () => {
	return (
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
			style={{ fontSize: "2em", display: "inline-block" }}
			repeat={Infinity}
		/>
	)
}

"use client"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SignIn() {
	const [clicked, setClicked] = useState(false)
	return (
		<Button
			variant={"outline"}
			size={"lg"}
			disabled={clicked}
			onClick={() => {
				setClicked(true)
				signIn("google")
			}}>
			<FcGoogle size={24} /> {clicked ? "Signing in..." : "Sign in"}
		</Button>
	)
}

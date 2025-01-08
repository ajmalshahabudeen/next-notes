"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImExit } from "react-icons/im"
import { signOut } from "next-auth/react"
import { VscLoading } from "react-icons/vsc"
import { useSessionStore } from "@/store/useSession"

export const LogoutIconButton = () => {
	const clearSession = useSessionStore((state) => state.clearSession)
	const [clicked, setClicked] = useState(false)
	return (
		<div>
			<Button
				variant={"outline"}
				disabled={clicked}
				size={"icon"}
				onClick={async () => {
					setClicked(true)
					await signOut().then(() => clearSession())
					// clearSession()
				}}
				className='text-red-500 border-red-500 hover:bg-red-500 hover:text-white'>
				{clicked ? (
					<VscLoading size={24} className='animate-spin' />
				) : (
					<ImExit size={24} />
				)}
			</Button>
		</div>
	)
}

export const LogoutIcon = () => {
	const clearSession = useSessionStore((state) => state.clearSession)
	const [clicked, setClicked] = useState(false)
	return (
		<div
			onClick={async () => {
				setClicked(true)
				await signOut().then(() => clearSession())
				// clearSession()
			}}
			className='text-red-500 cursor-pointer'>
			{clicked ? (
				<VscLoading size={24} className='animate-spin' />
			) : (
				<ImExit size={24} />
			)}
		</div>
	)
}

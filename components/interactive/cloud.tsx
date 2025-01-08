"use client"

import React, { useEffect } from "react"
import { CiCloudRainbow } from "react-icons/ci"
import { IoCloudDoneOutline } from "react-icons/io5"
import { LuCloudAlert } from "react-icons/lu"
import { toast } from "sonner"
import { useNoteStore } from "@/store/useNote"
import SignIn from "@/components/Buttons/sign-in"
import { motion } from "motion/react"

export const CloudSync = () => {
	const saving = useNoteStore((state) => state.saving)
	const saved = useNoteStore((state) => state.saved)
	const error = useNoteStore((state) => state.error)
	const notAuth = useNoteStore((state) => state.notAuth)

	const runNoAuth = () => {
		toast("Please sign in", {
			description: "login to save your notes to the cloud",
			// variant: "destructive",
			action: <SignIn />,
		})
	}

	useEffect(() => {
		runNoAuth()
	}, [notAuth])

	return (
		<div className='fixed top-5 right-3'>
			{saving && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}>
					<CiCloudRainbow className='animate-pulse' size={22} />
				</motion.div>
			)}
			{saved && !saving && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}>
					<IoCloudDoneOutline className='text-green-500' size={20} />
				</motion.div>
			)}
			{error && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}>
					<LuCloudAlert className='text-yellow-500' size={20} />
				</motion.div>
			)}
		</div>
	)
}

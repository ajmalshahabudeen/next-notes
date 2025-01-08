"use client"
import React, { useEffect } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { MdOutlineTitle } from "react-icons/md"
import { GoShareAndroid } from "react-icons/go"
import { motion } from "motion/react"
import { FaCircleMinus } from "react-icons/fa6"
import { GrChapterAdd } from "react-icons/gr"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNoteStore } from "@/store/useNote"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { LogoutIcon } from "../Buttons/logout"
import { useSessionStore } from "@/store/useSession"
import { SignInIcon } from "../Buttons/sign-in"
import { Input } from "../ui/input"
import History from "@/components/user/history"

export const Menu = () => {
	const setNewId = useNoteStore((state) => state.setNewId)
	const clearNote = useNoteStore((state) => state.clearNote)
	const session = useSessionStore((state) => state.session)
	const getSession = useSessionStore((state) => state.getSession)
	const title = useNoteStore((state) => state.title)
	const setTitle = useNoteStore((state) => state.setTitle)
	const saveToDB = useNoteStore((state) => state.saveToDB)

	const NewNote = () => {
		setNewId()
		clearNote()
	}
	useEffect(() => {
		getSession()
	}, [getSession])

	const [open, setOpen] = React.useState(false)
	return (
		<div className='fixed z-50 bottom-4 left-4 flex items-center gap-4'>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
					rotate: open ? 180 : 0,
				}}>
				{open ? (
					<FaCircleMinus
						size={30}
						className='rounded-full shadow-lg'
						onClick={() => setOpen(false)}
					/>
				) : (
					<BsPlusCircleFill
						onClick={() => setOpen(true)}
						size={30}
						className='rounded-full shadow-lg'
					/>
				)}
			</motion.div>
			{open && (
				<div className='flex gap-2 items-center'>
					<motion.div
					className="flex items-center"
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Dialog>
										<DialogTrigger>
											<MdOutlineTitle size={24} />
										</DialogTrigger>
										<DialogContent className='max-w-[90%] md:w-auto'>
											<DialogHeader>
												<DialogTitle>
													Give it a title
												</DialogTitle>
												<DialogDescription className='flex flex-col gap-2'>
													<Input
														value={title}
														onChange={(e) =>
															setTitle(
																e.target.value
															)
														}
													/>
													<DialogClose asChild>
														<Button
															onClick={() =>
																saveToDB()
															}>
															Save
														</Button>
													</DialogClose>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</TooltipTrigger>
								<TooltipContent>
									<p>Edit Title</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
					<motion.div
					className="flex items-center"
						initial={{
							opacity: 0,
						}}
						transition={{
							delay: 0.1,
						}}
						animate={{
							opacity: 1,
							x: open ? 10 : 0,
						}}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<GoShareAndroid size={24} />
								</TooltipTrigger>
								<TooltipContent>
									<p>Share</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
					<motion.div
					className="flex items-center"
						initial={{
							opacity: 0,
						}}
						transition={{
							delay: 0.1,
						}}
						animate={{
							opacity: 1,
							x: open ? 20 : 0,
						}}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Dialog>
										<DialogTrigger>
											<GrChapterAdd size={24} />
										</DialogTrigger>
										<DialogContent className='max-w-[90%] md:w-auto'>
											<DialogHeader>
												<DialogTitle>
													Confirm
												</DialogTitle>
												<DialogDescription>
													Clear current note and start
													a new note. Notes are saved
													automatically and can be
													viewed in the history.
												</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<DialogClose asChild>
													<Button onClick={NewNote}>
														Yes
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</TooltipTrigger>
								<TooltipContent>
									<p>New Note</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
					<motion.div
						initial={{
							opacity: 0,
						}}
						transition={{
							delay: 0.2,
						}}
						animate={{
							opacity: 1,
							x: open ? 30 : 0,
						}}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
								<History />
								</TooltipTrigger>
								<TooltipContent>
									<p>View History</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
					<motion.div
						initial={{
							opacity: 0,
						}}
						transition={{
							delay: 0.3,
						}}
						animate={{
							opacity: 1,
							x: open ? 40 : 0,
						}}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									{session ? <LogoutIcon /> : <SignInIcon />}
								</TooltipTrigger>
								<TooltipContent>
									<p>Sign Out</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
				</div>
			)}
		</div>
	)
}

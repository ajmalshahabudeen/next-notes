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
import { Button } from "@/components/ui/button"
import { LogoutIcon } from "@/components/Buttons/logout"
import { useSessionStore } from "@/store/useSession"
import { SignInIcon } from "@/components/Buttons/sign-in"
import { Input } from "@/components/ui/input"
import History from "@/components/user/history"
import { Checkbox } from "@/components/ui/checkbox"
import copy from "copy-to-clipboard"
import { createSharedNote } from "@/server/SharedNotes"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/Buttons/ToggleTheme"

export const Menu = () => {
	const rc = useRouter()
	const noteID = useNoteStore((state) => state.id)
	const setNewId = useNoteStore((state) => state.setNewId)
	const clearNote = useNoteStore((state) => state.clearNote)
	const session = useSessionStore((state) => state.session)
	const getSession = useSessionStore((state) => state.getSession)
	const title = useNoteStore((state) => state.title)
	const setTitle = useNoteStore((state) => state.setTitle)
	const saveToDB = useNoteStore((state) => state.saveToDB)

	const [checked, setChecked] = React.useState(false)
	const [privateChecked, setPrivateChecked] = React.useState(false)
	const [linkLoading, setLinkLoading] = React.useState(false)
	const [linkError, setLinkError] = React.useState(false)
	const [linkCopied, setLinkCopied] = React.useState(false)

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
						size={40}
						className='rounded-full'
						onClick={() => setOpen(false)}
					/>
				) : (
					<BsPlusCircleFill
						onClick={() => setOpen(true)}
						size={40}
						className='rounded-full shadow-lg'
					/>
				)}
			</motion.div>
			{open && (
				<div className='flex gap-2 items-center'>
					<motion.div
						className='flex items-center'
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
						className='flex items-center'
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
								<TooltipTrigger asChild>
									<Dialog>
										<DialogTrigger>
											<GoShareAndroid size={24} />
										</DialogTrigger>
										<DialogContent className='max-w-[90%] md:w-auto'>
											<DialogHeader>
												<DialogTitle className='text-start'>
													Share Note
												</DialogTitle>
												<DialogDescription className='text-start'>
													Share your notes with other
													users
												</DialogDescription>
												<section className='flex flex-col gap-2'>
													<div className='flex items-center gap-2'>
														<Checkbox
															checked={checked}
															onCheckedChange={() =>
																setChecked(
																	!checked
																)
															}
														/>
														<p>Editable</p>
													</div>
													<div className='flex items-center gap-2'>
														<Checkbox
															checked={
																privateChecked
															}
															onCheckedChange={() =>
																setPrivateChecked(
																	!privateChecked
																)
															}
														/>
														<p>Private</p>
													</div>
													<Button
														onClick={async () => {
															setLinkLoading(true)
															await createSharedNote(
																noteID,
																checked,
																privateChecked
															).then((res) => {
																setLinkLoading(
																	false
																)
																// console.log(res)
																if (
																	res.status ===
																	200
																) {
																	copy(
																		window
																			.location
																			.origin +
																			"/notes/shared/" +
																			res.data
																	)
																	setLinkCopied(
																		true
																	)
																	setLinkError(
																		false
																	)
																	setTimeout(
																		() => {
																			setLinkCopied(
																				false
																			)
																		},
																		2000
																	)
																} else {
																	setLinkCopied(
																		false
																	)
																	setLinkError(
																		true
																	)
																	setTimeout(
																		() => {
																			setLinkError(
																				false
																			)
																		},
																		5000
																	)
																}
															})
														}}>
														{linkLoading ? (
															"Creating..."
														) : linkCopied ? (
															<p className='text-green-400'>
																Copied
															</p>
														) : (
															"Create"
														)}
													</Button>
													{linkError && (
														<p className='text-red-600'>
															Error while creating
															link
														</p>
													)}
												</section>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</TooltipTrigger>
								<TooltipContent>
									<p>Share</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
					<motion.div
						className='flex items-center'
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
													<Button
														onClick={() => {
															rc.push("/notes")
															NewNote()
														}}>
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
									<ModeToggle />
								</TooltipTrigger>
								<TooltipContent>
									<p>Sign Out</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</motion.div>
					<motion.div
						initial={{
							opacity: 0,
						}}
						transition={{
							delay: 0.4,
						}}
						animate={{
							opacity: 1,
							x: open ? 50 : 0,
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

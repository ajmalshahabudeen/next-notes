"use client"
import React, { useEffect } from "react"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { GoHistory } from "react-icons/go"
import { useHistoryStore } from "@/store/useHistory"
import { useSessionStore } from "@/store/useSession"
import { FaTrashCanArrowUp } from "react-icons/fa6"

const History = () => {
	const history = useHistoryStore((state) => state.history)
	const loading = useHistoryStore((state) => state.loading)
	const error = useHistoryStore((state) => state.error)
	const getHistory = useHistoryStore((state) => state.getHistory)
	const session = useSessionStore((state) => state.session)

	useEffect(() => {
		if (session) {
			getHistory()
		}
	}, [getHistory, session])

	return (
		<div>
			<Drawer>
				<DrawerTrigger className='flex items-center'>
					<GoHistory size={24} />
				</DrawerTrigger>
				<DrawerContent className='h-full'>
					<DrawerHeader>
						<DrawerTitle>History</DrawerTitle>
						<DrawerDescription>view past notes.</DrawerDescription>
					</DrawerHeader>
					<section>
						{loading ? (
							<p className='text-2xl'>Loading...</p>
						) : error ? (
							<p className='text-red-500 text-2xl'>
								Something went wrong
							</p>
						) : (
							<div className='p-5'>
								<div className='flex flex-col gap-5'>
									{history.map((item) => (
										<div
											className='flex justify-between border rounded px-5 py-2 hover:border-black'
											key={item.id}>
											<p className='hover:underline'>{item.title}</p>
											<FaTrashCanArrowUp className="text-red-500" size={24} />
										</div>
									))}
								</div>
							</div>
						)}
					</section>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant='outline'>Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default History

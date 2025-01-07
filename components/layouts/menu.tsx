"use client"
import React from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { CiEdit, CiShare2 } from "react-icons/ci"
import { GoHistory } from "react-icons/go"
import { motion } from "motion/react"
import { FaCircleMinus } from "react-icons/fa6"

export const Menu = () => {
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
				<div className='flex gap-2'>
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}>
						<CiEdit size={24} />
					</motion.div>
					<motion.div
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
						<CiShare2 size={24} />
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
							x: open ? 20 : 0,
						}}>
						<GoHistory size={24} />
					</motion.div>
				</div>
			)}
		</div>
	)
}

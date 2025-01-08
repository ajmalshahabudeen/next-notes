import { Menu } from "@/components/layouts/menu"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
	title: "Notes - Next NoteBook",
	description: "Write More",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			{children}
			<Menu />
			<Toaster />
		</div>
	)
}

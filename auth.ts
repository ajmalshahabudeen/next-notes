import NextAuth from "next-auth"
import { prisma } from "@/prisma/prisma" 
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
		maxAge: 1 * 24 * 60 * 60, // 1 days
	},
	pages: {
		signIn: "/",
		signOut: "/",
		error: "/error",	
	},
	providers: [
		Google({
			allowDangerousEmailAccountLinking: true,

		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			// console.log({ token, user });  ONLY TOKEN works!!!
			if (user) {
				token.id = user.id
				token.status = (user as UserType).status
			}
			return token
		},
		session: async ({ session, token }) => {
			// console.log({ session, token });
			if (token) {
				const typedSession = session as unknown as Session
				typedSession.user.id = token.id
				typedSession.user.status = token.status
			}
			return session
		},
		signIn: async ({ user, account, profile, email }) => {
			console.log({ user, account, profile, email })
			if (account?.provider === "google") {
				try {
					const user = await prisma.user.findUnique({
						where: {
							email: profile?.email as string,
						},
					})
					if (!user) {
						console.log("User not found")
						return false
					} else {
						console.log("User found", user)
						return user.status === "ACTIVE"
					}
					
				} catch (error) {
                    console.log(error)
					return false
				}
			}
			if ((user as UserType).status === "ACTIVE") {
				return true
			}
			return false
		}
	},
})

type UserType = {
	id: string | unknown
	role: string | unknown
	status: string | unknown
}

interface Session {
	user: UserType
}
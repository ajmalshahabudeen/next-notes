import { auth } from "@/auth"

const dashboardPage = /^\/notes(?:\/.*)?$/

export default auth((req) => {
	// if user is authenticated, redirect to the home page
	if (req.auth && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
		const newUrl = new URL("/dashboard", req.nextUrl.origin)
		return Response.redirect(newUrl)
	}

	// if user is not authenticated, redirect to the login page
	if (!req.auth && dashboardPage.test(req.nextUrl.pathname)) {
		// console.log(regMatcherStaff.test(req.nextUrl.pathname))
		const newUrl = new URL("/", req.nextUrl.origin)
		return Response.redirect(newUrl)
	}
})

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
		"/api/:path*",
	],
}
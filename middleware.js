import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('authToken'); // Check for an authentication token

    // If no token is found and the user is trying to access a protected route
    if (!token && req.nextUrl.pathname.startsWith('/chatpage')) {
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to the main page
    }

    return NextResponse.next(); // Allow the request to proceed
}

export const config = {
    matcher: ['/chatpage/:path*'], // Apply middleware to /chatpage and its subpaths
};
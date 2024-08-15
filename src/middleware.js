import { NextResponse } from "next/server";

export async function middleware(request) {

    // Step pertama: cek url
    // Kalo dia di halaman login / api login, tidak perlu accessToken
    
    const loginPath = ["/login", "/api/login", "/register", "/api/register", "/api/login/validation"]
    if(loginPath.some((v) => v === request.nextUrl.pathname)) {
        return NextResponse.next();
    } else {
        // Butuh Access Token
        const cookies = request.cookies.get("Access Token");
        
        if(cookies) {
            const accessToken = cookies.value;
            const response = await fetch(`http://localhost:3000/validation/${accessToken}`);
            const existingUser = await response.json();

            // Kondisi jika existingUser.data tidak ada maka harus redirect ke halaman login
            if(!existingUser.data) return NextResponse.redirect(new URL("/login", request.url))

            // Boleh hit API atau Masuk ke halaman (Authenticated)
            return NextResponse.next();

        } else {
            // Unauthenticated dan redirect ke halaman login
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
    matcher: ["/login", "/api/:function*", "/books/:function*", "/api/books/uploads", "/", "/addbook", "/register"]
}
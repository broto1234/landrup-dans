import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export function proxy(request) {
  const token = request.cookies.has("accessToken");

  if( !token ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // try {
    // const decode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // const decode = jwt.decode(token);
    // const role = decode?.data?.role;
    // if (!role || (role !== "default" && role !== "instructor")) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
    
    //Role-base reditect
    // if (role === "default") {
    //   return NextResponse.redirect(new URL('/user', request.url))
    // // console.log("Decoded token:", decode);
    // } 
    
    // if (role === "instructor") {
    //   return NextResponse.redirect(new URL('/instructor', request.url))
    // } 
  //   catch (error) {
  //   console.error("Error decoding token:", error);
  //   return NextResponse.redirect(new URL('/login', request.url))
  //  }
  // }
};

export const config = {
  matcher: ['/(withnav)/user', '/(withnav)/instructor'],
}
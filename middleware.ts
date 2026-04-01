import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// List of admin routes to protect
const ADMIN_PATH = "/admin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  //check the routes that are not admins route 
  if(pathname.startsWith(`${ADMIN_PATH}/login`))
  {
    return NextResponse.next();//allow access without checking the jwt 
  }
  if(!pathname.startsWith(ADMIN_PATH))
  {
    return NextResponse.next();//
  }
  //read the cookies and get the token 
//   const cookiesStore= await cookies() 
  const token= request.cookies.get("admin_token")?.value; 
  //check if there is token 
  if(!token) 
  {
    return NextResponse.redirect(new URL(`${ADMIN_PATH}/login`, request.url));
  }
  try{
    //verify jwt 
    jwt.verify(token,process.env.Jwt_Secret!);
    return NextResponse.next()
  }
  catch(err:any)
  {
    return NextResponse.redirect(new URL(`${ADMIN_PATH}/login`, request.url));
  }

  
}

//apply middleware for the admin path only 
export const config ={
    matcher:"/admin/:path*"
}
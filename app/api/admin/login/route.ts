import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';

import { NextRequest ,NextResponse } from 'next/server';
export async function POST(request:NextRequest) {

 try{
    //get the email and password 
    const body=await request.json()
    const {email,password}=body
    //check if the email are given or not 
    if(!email||!password){
        return NextResponse.json({error:'Fields are empty'},{status:400})
    }
    //finding the admin in the db 
    const admin=await prisma.admin.findUnique({
        where:{
            email
        }
    })
    if(!admin)
    {
        return NextResponse.json({error:"Email not found"},{status:400})
    }
    
    const isValid=await bcrypt.compare(password,admin?.password)
    if(!isValid)
    {
        return NextResponse.json({error:"Password Invalid"},{status:400})
    }
    const token=jwt.sign(
        {id:admin.id ,email:admin.email},
        process.env.JWT_SECRET!,
        {expiresIn:'1d'}
    )
    const cookiesStore=await cookies()
    cookiesStore.set('admin_token',token,{
        httpOnly:true,
        maxAge:60*60*24,
        path:'/'
    })
    return NextResponse.json({message:"Login Sucessful"},{status:200})
    }


catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
    
}
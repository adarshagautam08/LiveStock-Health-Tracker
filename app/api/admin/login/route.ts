import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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
    return NextResponse.json({message:"Login Sucessful"},{status:200})
    }


catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
    
}
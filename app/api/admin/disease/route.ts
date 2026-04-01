import {prisma } from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'
export async function GET(request:NextRequest)
{
    //use the try catch method
    try{
        const getAllDisease=await prisma.disease.findMany()
        return NextResponse.json({getAllDisease},{status:201})
    }
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:400})
    }
}
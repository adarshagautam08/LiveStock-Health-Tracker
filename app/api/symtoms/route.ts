import {prisma} from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'
export async function GET(request:NextRequest)
{
    //using the try and catch
    try{
        const getAllSymptoms=await prisma.symptom.findMany()
        return NextResponse.json({getAllSymptoms},{status:201})
    }
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }

}

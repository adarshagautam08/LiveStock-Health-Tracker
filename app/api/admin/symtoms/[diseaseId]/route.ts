import {prisma} from '@/lib/prisma'

import { NextRequest,NextResponse } from 'next/server'
export async function POST(request:NextRequest ,{params}:{params:{diseaseId:string}}) {
    //using the try catch for the proper error catch
    try{
        //take the data from the api
        const body=await request.json()
        const {name}=body
        const {diseaseId}=await params
        //check if the data are empty
        if(!name)
        {
            return NextResponse.json({error:'Field empty'},{status:400})
        }
        const symptomsadded=await prisma.symptom.create({
            data:{
                name,
                diseaseId
            }
        })
        return NextResponse.json({message:'symptoms added ',symptomsadded},{status:201})

    }
    catch (err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}
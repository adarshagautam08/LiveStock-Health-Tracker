import {prisma} from '@/lib/prisma'
import { error } from 'console'
import { NextResponse,NextRequest } from 'next/server'
export async function POST(request:NextRequest,{params}:{params:{animalId:string}})
{
    //using the try catch
    try{
        const body=await request.json()
        const {name,treatment,description,severity}=body
        const {animalId}=params
        //the data should not be empty 
        if(!name||!treatment||!description||!severity)
        {
            return NextResponse.json({error:'fields are empty'},{status:400})
        }

        //then add the data based on the id 
        const dieseseadded=await prisma.disease.create({
            data:{
                name,
                treatment,
                description,
                severity,
                animalId
            }
        })
        return NextResponse.json({dieseseadded},{status:201})
        
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}
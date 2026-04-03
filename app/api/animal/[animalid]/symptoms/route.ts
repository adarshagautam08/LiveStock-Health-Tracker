import {prisma} from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'
export async function GET(_request:NextRequest,{params}:{params:{animalId:string}})
{
    try{
        const {animalId}=await params
        console.log("animalId received:", animalId)
        const animalSymptoms=await prisma.symptom.findMany({
            where:{
                disease:{
                    animalId
                }
            }
        })
        return NextResponse.json(animalSymptoms)
    }
    catch(err:any){
        return NextResponse.json({error:err.message})
    }
}
import {prisma} from '@/lib/prisma'
import { NextResponse,NextRequest } from 'next/server'
export async function POST(request:NextRequest,{params}:{params:{animalId:string}})
{
    //using the try catch
    try{
        const body=await request.json()
        const {name,treatment,description,severity,symptoms}=body
        const {animalId}= await params
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
        //then add for the symptoms using the disease id
        if(symptoms&&symptoms.length>0)
        {
            await prisma.symptom.createMany({
                data:symptoms.map((s:string)=>({
                    name:s,
                    diseaseId:dieseseadded.id
                }))
            })
        return NextResponse.json({dieseseadded},{status:201})
        
    }
}
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
}

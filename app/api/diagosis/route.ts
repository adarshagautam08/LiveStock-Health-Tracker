import {prisma} from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'

export async function POST(request:NextRequest)
{
    //using the try catch method
    
    try{
        //take the animal and symptoms data 
        const body=await request.json()
        const{animalId,symptoms}=body
        //reject if the data is empty
        if(!animalId||!symptoms)
        {
            return NextResponse.json({error:'the fields are empty'},{status:200})
        }
      
        const getDiseases=await prisma.disease.findMany({
            where:{
                animalId
            },
            include:{
                symptom:true
            }
        })


//this is the main system of this website 
        //now writing the main system flow 
       const scored = getDiseases.map(disease => {
           const matched = disease.symptom.filter(s =>
       symptoms.includes(s.name)
       )
       const score = (matched.length / disease.symptom.length) * 100
       return { ...disease, score }
        })
        console.log(scored)
    return NextResponse.json({ results:scored }, { status: 200 })
        

        //one is the disease 
        //another is the user given symptoms 
        //so we will get the disease symptoms 
        //divide it with the user symptoms and multiply with the 100 to get the percentage and send it to the frontend 


    }
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
}
import {prisma} from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server';
export async function POST(request:NextRequest)
{
    //using try catch
    try{
        //get the data 
        const body=await request.json()
        const {name,image}=body
        //check if they are empty 
        if(!name)
        {
            return NextResponse.json({err:'Fill the data'},{status:400})
        }
        //check if the animal exists
        const animalName=await prisma.animal.findFirst({
            where:{
                name
            }
        })
        if(animalName)
        {
            return NextResponse.json({error:'the animal already exists '},{status:400})
        }
        //adding the animal in the data base 
        await prisma.animal.create({
            data:{
                name,
                image
            }
        })
        return NextResponse.json({message:'Added the animal sucessfully '})
    }
    
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
}

//get all the animal 
export async function GET(request:NextRequest) {
    try{
        const getAnimals=await prisma.animal.findMany()
        return NextResponse.json({getAnimals},{status:201})
    }
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
}
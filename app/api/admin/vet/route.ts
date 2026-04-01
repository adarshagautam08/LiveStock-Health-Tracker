import {prisma} from '@/lib/prisma'

import { NextRequest,NextResponse } from 'next/server'

export async function POST(request:NextRequest)
{
    //using try catch 
    try{
        //get the data from the frontend 
        const body=await request.json()
        const {name,phone,address,district}=body
        //check if the field are not empty 
        if(!name||!phone||!address||!district)
        {
            return NextResponse.json({error:'fields are empty'},{status:400})
        }
        //adding to the db 
        const vetAdded=await prisma.vet.create({
            data:{
                name,
                phone,
                address,
                district
            }
        })
        return NextResponse.json({message:"vet added",vetAdded},{status:201})

    }
    catch (err:any) {
        return NextResponse.json({error:err.message},{status:500})
    }
}


//get request for the all vet
export async function GET( request:NextRequest)
{  
    try{
    const getVet=await prisma.vet.findMany()
    return NextResponse.json({getVet},{status:201})
    }
    catch(err:any)
    {
        return NextResponse.json({error:err.message},{status:500})
    }
    
}
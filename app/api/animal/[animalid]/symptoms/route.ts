import {prisma} from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'
// export async function GET(_request:NextRequest,{params}:{params:{animalId:string}})
// {
//     try{
//         const animalId = await params
//         console.log("animalId received:", animalId)
//         const animalSymptoms=await prisma.symptom.findMany({
//             where:{
//                 disease:{
//                     is:{
//                         animalId:animalId
//                     }
//                 }
//             }
//         })
//         return NextResponse.json(animalSymptoms)
//     }
//     catch(err:any){
//         return NextResponse.json({error:err.message})
//     }
// }

export async function GET(
  _request: NextRequest,
  { params }: { params: { animalid: string } }
) {
  try {
    const { animalid } =await params;

    console.log("animalId received:", animalid);

    const animalSymptoms = await prisma.symptom.findMany({
      where: {
        disease: {
          is: {
            animalId: animalid
          }
        }
      }
    });
    console.log(animalSymptoms)

    return NextResponse.json(animalSymptoms);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
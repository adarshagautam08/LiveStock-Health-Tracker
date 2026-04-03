import {prisma } from '@/lib/prisma'
import DiagnoseAnimal from '../component/Diagonisanimal'
import UserNavbar from '../component/UserNavbar'
export default async function Diagnose()
{
  const animals=await prisma.animal.findMany()
  const symptoms=await prisma.symptom.findMany()
  return (
    <div className="bg-white text-black h-screen" >
      <UserNavbar/>
    <div className=' flex justify-center flex-col items-center'>
      <DiagnoseAnimal myList={animals} allsymptoms={symptoms} />
    </div>
    </div>
  )
}
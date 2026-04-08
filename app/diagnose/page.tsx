import {prisma } from '@/lib/prisma'
import DiagnoseAnimal from '../component/Diagonisanimal'
import UserNavbar from '../component/UserNavbar'
export default async function Diagnose()
{
  const animals=await prisma.animal.findMany()
  
  return (
    
    <div className="bg-white overflow-y-auto text-black " >
      <UserNavbar/>
    <div className=' flex  h-screen  flex-col '>
      <DiagnoseAnimal myList={animals}  />
    </div>
    </div>
    
  )
}
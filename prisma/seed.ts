import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'
async function main()
{
    const existing=await prisma.admin.findFirst()
    if(existing)
    {
        console.log('Admin already existed ')
        return
    }
    const hashPassword=await bcrypt.hash('admin123',10)
    await prisma.admin.create({
        data:{
            email:'adminpashu@123',
            password:hashPassword
        }
    })
    console.log("Admin created sucessuflly")
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
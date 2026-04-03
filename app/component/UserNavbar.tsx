'use client'
import Link from "next/link"
export default function UserNavbar()
{
    return(
        <div className="bg-[#2D6A4F] flex items-center justify-between h-20" >

            <Link href={'/'} className=" ml-2 gap-2.5 flex items-center" >
            <span className="text-2xl">🐄</span>
                <span className="font-semibold text-white text-lg tracking-tight">
            PashuSwasthya
          </span>
            </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-white " > 
            <h2 className="text-2xl justify-center flex items-center">Diagnose Your Livestock</h2>
            <p className=" font-light font-serif ">Select your animal and observed symptoms to get an instant diagnosis</p>
        </div>
            
            <Link
            href="/admin/login"
            className="text-sm h-20 justify-center items-center flex w-24 mr-2 text-white font-bold hover:text-gray-800 transition"
          >
            Admin
          </Link>
            

        </div>
    )
}
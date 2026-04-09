'use client'

import { useEffect, useState } from "react"
import { toast } from 'sonner'

type Vets = {
  id: string
  name: string
  phone: string
  address: string
  district: string
}

export default function AddVets() {
  const [allVets, setallVets] = useState<Vets[]>([])
  const [select, setSelect] = useState(false)
  const [form,setform]=useState({
    name:"",
    district:"",
    address:"",
    phone:""
  });

  const addDetail=async(e:React.FormEvent)=>
  {
    e.preventDefault()
    const res=await fetch(`/api/vet`,{
        method:'POST',
         headers: { "Content-Type": "application/json" },
         body:JSON.stringify({
            name:form.name,
            address:form.address,
            district:form.district,
            phone:form.phone
         })
    })
    const savedVet=await res.json()
    setallVets(prev=>[...prev,savedVet])
    if(res.ok)
    {
        setform({name:"",district:"",address:"",phone:""})
        setSelect(false)
        toast.success("Vet added sucessfully")
    }
    else{
        toast.error("Failed to add vet")
    }


  }

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const res = await fetch('/api/vet')
        const data = await res.json()
        setallVets(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchVets()
  }, [setallVets])

  const handleDelete = async (item: Vets) => {
    try {
      await fetch(`/api/vet/${item.id}`, { method: "DELETE" })
      setallVets(allVets.filter(v => v.id !== item.id))
      toast.success("Vet deleted successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete Vet.")
    }
  }

  const addData = () => {
    setSelect(true)
  }


  return (
    <div className="p-4">
      <div className="bg-[#2D6A4F] flex justify-between rounded-lg text-xl text-white p-2">
        <h1>All Vets data</h1>
        <button 
          onClick={addData} 
          className="bg-blue-400 text-[15px] rounded-lg w-30 cursor-pointer hover:bg-blue-500 hover:text-[16px] transition-all duration-300"
        >
          + Add vets
        </button>
      </div>

      {select && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[350px] shadow-lg relative">
            <form onSubmit={addDetail} className="space-y-3">
              <p className="text-lg font-semibold">Fill the data</p>

              <div>
                <label className="block text-sm font-medium mb-1">Add name</label>
                <input 
                onChange={(e)=>setform({...form ,name:e.target.value})}

                value={form.name}
                  type="text" 
                  placeholder="Enter the name" 
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Add phone</label>
                <input 
                  type="text" 
                  value={form.phone}
                  onChange={(e)=>setform({...form,phone:e.target.value})}
                  placeholder="Enter phone" 
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Add Address</label>
                <input 
                  type="text"
                  value={form.address}
                  onChange={(e)=>setform({...form,address:e.target.value})} 
                  placeholder="Enter address" 
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Add District</label>
                <input 
                value={form.district}
                onChange={(e)=>setform({...form,district:e.target.value})}
                  type="text" 
                  placeholder="Enter district" 
                  className="w-full border p-2 rounded"
                />
              </div>
            <div className="flex gap-2 " >
            <button 
                type="submit"
                className="bg-[#2e684e] cursor-pointer text-white w-full py-2 rounded hover:bg-[#2a5e47] transition"
              >
                Add
              </button>
              <button 
                type="button"
                onClick={() => setSelect(false)}
                className="bg-red-400 cursor-pointer text-white w-full py-2 rounded hover:bg-red-500 transition"
              >
                Close
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {allVets.map((item,idx) => (
          <div
            key={item.id||idx}
            className="border rounded-lg p-3 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.phone}</p>
              <p className="text-sm text-gray-600">{item.address}</p>
              <p className="text-sm text-gray-600">{item.district}</p>
            </div>

            <button
              onClick={() => handleDelete(item)}
              className="bg-red-400 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
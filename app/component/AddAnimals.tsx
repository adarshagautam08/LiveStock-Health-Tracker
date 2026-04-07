"use client";

import { useEffect, useState } from "react";
type Animal = {
  id: string;
  name: string;
  image?: string;
};

export default function AddAnimal() {
  const [name, setname] = useState("");
  const [image, setImage] = useState("");
  const [display, setdisplay] = useState<Animal[]>([]);
  const[loading,setloading]=useState(false);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addAnimal = async () => {
    if (!name) return;
    const res = await fetch("/api/animal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });
    const data = await res.json();
    if (res.ok) {
      setname("");
      setImage("");
      console.log("Animal added:", data);
    } else {
      console.error("Error:", data.error);
    }
  };

  useEffect(() => {
    setloading(true)
    const fetchanimal = async () => {
      const res = await fetch("/api/animal");
      const data = await res.json();
      setdisplay(data.getAnimals);
      console.log(data);
      setloading(false)
    };
    fetchanimal();
  }, []);
  if(loading){
    return(
    <div className="flex justify-center items-center ">
    <h1 className="flex justify-center items-center" >loading ...</h1>
    </div>
    )
  }


  return (
    <div className="bg-white rounded-2xl border  border-gray-200 p-6 mb-6">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
        Add Animal
      </p>

      <div className="flex flex-col gap-3 max-w-md">
        <input
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-white"
          placeholder="Animal name (e.g. Cow)"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#e8f5ee] file:text-[#2D6A4F] hover:file:bg-[#d1ead9]"
        />

        <button
          onClick={addAnimal}
          className="w-full cursor-pointer py-2.5 bg-[#2D6A4F] hover:bg-[#235a3f] text-white text-sm font-medium rounded-lg transition-all duration-200"
        >
          + Add Animal
        </button>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {display.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center bg-gray-50 hover:shadow-md transition"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mb-2 text-gray-500 text-xs">
                No Image
              </div>
            )}

            <p className="text-sm font-medium text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

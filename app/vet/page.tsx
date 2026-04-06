"use client";

import { useEffect, useState } from "react";

type Vet = {
  name: string;
  phone: string;
  address: string;
  district: string;
};

export default function VetPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  //geting the vet when the page refresh 
  useEffect(() => {
    const fetchVet = async () => {
      const res = await fetch("/api/vet");
      const data = await res.json();
      //setting the vet data in the setVet state
      setVets(data);
      //here we are taking the district only 
      setDistricts([...new Set<string>(data.map((v: Vet) => v.district))]);
    };
    fetchVet();
  }, []);


  const filteredVets = 
  selectedDistrict
    ? vets.filter((v) => v.district === selectedDistrict)
    : [];

  return (
    <div>
      <div className="bg-[#2D6A4F] h-20 flex flex-col px-4 justify-center items-center">
        <h1 className="text-2xl text-white">Find a Vet</h1>
        <p className="text-gray-300 text-sm">
          Search veterinarians by district across Nepal
        </p>
      </div>

      <div className="flex flex-col justify-center items-center py-6 px-2 gap-4">
        <div className="flex gap-2 w-full max-w-md">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          >
            <option value="">Select district...</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Vet Cards */}
        <div className="w-full max-w-md space-y-3">
          {filteredVets.length === 0 && selectedDistrict && (
            <p className="text-center text-gray-400 text-sm">No vets found in this district</p>
          )}
          {filteredVets.map((vet) => (
            <div key={vet.phone} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="font-medium text-gray-800">{vet.name}</p>
              <p className="text-sm text-gray-500 mt-1">{vet.address}</p>
              <p className="text-sm text-[#2D6A4F] font-medium mt-1">{vet.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
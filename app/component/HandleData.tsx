"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Animal = {
  id: string;
  name: string;
  image: string | null;
};

type Disease = {
  id: string;
  name: string;
  description: string;
  treatment: string;
  severity: string;
};

export default function   HandleData() {
  const [animal, setAnimal] = useState<Animal[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [alldisease, setalldisease] = useState<Disease[]>([]);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch("/api/animal");
        const data = await res.json();
        setAnimal(data.getAnimals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnimal();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const fetchAnimalData = async () => {
      try {
        const res = await fetch(`/api/disease/${selected}`);
        const data = await res.json();
        setalldisease(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnimalData();
  }, [selected]);

  const handleDelete = async (item: Disease) => {
  try {
    await fetch(`/api/disease/single/${item.id}`, { method: "DELETE" });
    setalldisease(alldisease.filter(d => d.id !== item.id));
    toast.success("Disease deleted successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete disease.");
  }
};

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Select Animal</h2>

      <select
        value={selected || ""}
        onChange={(e) => setSelected(e.target.value)}
        className="mb-6 p-2 border rounded-md w-full max-w-xs"
      >
        <option value="">-- Choose Animal --</option>
        {animal.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* DISEASES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alldisease.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-medium">Description:</span> {item.description}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-medium">Treatment:</span> {item.treatment}
            </p>
            <p className="text-gray-700 text-sm mb-2">
              <span className="font-medium">Severity:</span> {item.severity}
            </p>

            <div className="flex gap-2">
              <button  className="flex-1 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">
                Edit
              </button>
              <button onClick={()=>handleDelete(item)} className="flex-1 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
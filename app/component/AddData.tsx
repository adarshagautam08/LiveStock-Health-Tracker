"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddData() {
  const [activeForm, setactiveForm] = useState(false);
  const [animal, setanimal] = useState([]);
  const [form, setForm] = useState({
    diseaseName: "",
    treatment: "",
    severity: "",
    description: "",
    animalid: "",
  });
  const [symptoms, setSymptoms] = useState<string[]>([""]);

  const clickbtn = () => {
    setactiveForm((prev) => !prev);
  };

  const postdata = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/disease/${form.animalid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name:form.diseaseName,
        treatment:form.treatment,
        severity:form.severity,
        description:form.description,
        symptoms:symptoms
      }), // send symptoms too
    });
     if (res.ok) {
      setForm({ diseaseName: "", treatment: "", severity: "", description: "", animalid: "" });
      setSymptoms([""]);
      setactiveForm(false);
      toast.success("Disease added successfully!");
    }
    else {
  toast.error("Failed to add disease.");
}
    
    const data = await res.json();
  console.log(data);
  };

  useEffect(() => {
    const fetchAnimal = async () => {
      const res = await fetch("api/animal");
      const data = await res.json();
      setanimal(data.getAnimals);
      console.log(data.getAnimals);
    };
    fetchAnimal();
  }, []);

  return (
    <div className="p-6 bg-white  rounded-2xl border max-h-[80vh] overflow-y-auto border-gray-200 shadow-sm">
      <div className="flex justify-end mb-4">
        <button
          onClick={clickbtn}
          className="bg-[#2D6A4F] h-8 w-28 rounded-lg text-white font-medium hover:bg-[#235a3f] transition-all"
        >
          +Add data
        </button>
      </div>

      {activeForm && (
        <div>
          <form onSubmit={postdata} className="flex flex-col gap-4">
            <p className="text-gray-500 font-medium">Fill the data</p>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Select Animal</label>
              <select
                value={form.animalid}
                onChange={(e) => setForm({ ...form, animalid: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              >
                <option value="">Select Animal</option>
                {animal.map((a: any) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Add Disease</label>
              <input
                type="text"
                placeholder="Enter Disease"
                value={form.diseaseName}
                onChange={(e) =>
                  setForm({ ...form, diseaseName: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Treatment</label>
              <input
                type="text"
                placeholder="Enter Treatment for the disease"
                value={form.treatment}
                onChange={(e) =>
                  setForm({ ...form, treatment: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Description</label>
              <input
                type="text"
                placeholder="Enter Treatment for the disease"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Risk</label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              >
                <option>Select Risk</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Symptoms</label>
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Enter symptom"
                    value={symptom}
                    onChange={(e) => {
                      const newSymptoms = [...symptoms];
                      newSymptoms[index] = e.target.value;
                      setSymptoms(newSymptoms);
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {index === symptoms.length - 1 && (
                    <button
                      className="bg-blue-400 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition-all"
                      type="button"
                      onClick={() => setSymptoms([...symptoms, ""])}
                    >
                      Add
                    </button>
                  )}
                  {symptoms.length > 1 && (
                    <button
                      className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition-all"
                      type="button"
                      onClick={() =>
                        setSymptoms(symptoms.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 cursor-pointer bg-[#2D6A4F] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#235a3f] transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

type Animal = {
  id: string;
  name: string;
  image: string | null;
};

type Symptom = {
  id: string;
  name: string;
};

export default function DiagnoseAnimal({ myList,allsymptoms }: { myList: Animal[],allsymptoms:Symptom[] }) {
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const animalEmojis: { [key: string]: string } = {
    Cow: "🐄",
    Buffalo: "🐃",
    Goat: "🐐",
    Pig: "🐖",
    Chicken: "🐔",
  };

  const handleAnimal = (item: Animal) => {
    setSelectedAnimal(item.id);
    setSelectedSymptoms([]); // reset symptoms when animal changes
  };

  useEffect(() => {
    if (!selectedAnimal) return;
    const fetchSymptoms = async () => {
      try {
        const res = await fetch(`/api/animal/${selectedAnimal}/symptoms`);
        const data: Symptom[] = await res.json();
        setSymptoms(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSymptoms();
  }, [selectedAnimal]);

  const toggleSymptom = (symptomName: string) => {
    if (selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptomName));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Step 1 */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Step 1 — Select Animal
        </p>
        <div className="flex flex-row gap-3 justify-center">
          {myList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleAnimal(item)}
              className={`w-20 flex flex-col justify-center items-center rounded-xl h-20 transition-all duration-300 cursor-pointer border
                ${
                  selectedAnimal === item.id
                    ? "bg-[#e8f5ee] border-[#2D6A4F]"
                    : "border-gray-200 hover:bg-[#e8f5ee] hover:border-[#2D6A4F]"
                }`}
            >
              <span className="text-2xl">{animalEmojis[item.name] || "🐾"}</span>
              <p className="text-xs mt-1 text-gray-700">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2 - only shows after animal is selected */}
      {selectedAnimal && (
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Step 2 — Select Symptoms
          </p>

          {symptoms.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No symptoms found for this animal
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.name)}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${
                      selectedSymptoms.includes(symptom.name)
                        ? "bg-[#e8f5ee] border-[#2D6A4F]"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                      ${
                        selectedSymptoms.includes(symptom.name)
                          ? "bg-[#2D6A4F] border-[#2D6A4F]"
                          : "border-gray-300"
                      }`}
                  >
                    {selectedSymptoms.includes(symptom.name) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{symptom.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3 - Diagnose button */}
      {selectedAnimal && selectedSymptoms.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Step 3 — Diagnose
          </p>
          <button
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#235a3f] text-white font-medium rounded-xl transition-all duration-200"
          >
            Diagnose Now →
          </button>
        </div>
      )}
    </div>
  );
}
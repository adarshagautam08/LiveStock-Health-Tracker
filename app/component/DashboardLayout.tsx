"use client";
import AddAnimal from "../component/AddAnimals";
import AddData from "../component/AddDiseases";
import AddSymptoms from "../component/AddSymptoms";
import AddVets from "../component/AddVets";
import { useState } from "react";
import Link from "next/link";
export default function DashboardLayout() {
  const [activePage, setactivePage] = useState("animal");
  const handleButton = (page: string) => {
    setactivePage(page);
  };
  //function to render the selected page
  const renderPage = () => {
    switch (activePage) {
      case "animal":
        return <AddAnimal />;
      case "addData":
        return <AddData />;
      case "symptoms":
        return <AddSymptoms />;
      case "vets":
        return <AddVets />;
    }
  };

  return (
    <div className="text-black h-full   ">
      {/**navbar */}
      <div className=" h-16 rounded-2xl flex px-4 text-2xl items-center bg-[#2D6A4F]">
        <h1 className="text-white font bold" >Welcome</h1>
      </div>

      <div className="flex my-1 rounded-2xl h-[90%]  gap-1  ">
        {/**sidebar */}
        <div className="w-[20%] rounded-2xl  my-2 bg-gray-100   px-2 py-2">
          <Link href={"/"} className=" ml-2 gap-2.5 flex items-center">
            <span className="text-xl">🐄</span>
            <span className="font-semibold text-black text-md tracking-tight">
              PashuSwasthya
            </span>
          </Link>
          <div className="flex  flex-col  ">
            <button
              className={`h-10 border rounded-lg cursor-pointer  text-black  mt-2 mb-2 transition ${
                activePage === "animal"
                  ? "bg-[#4a8068] text-white "
                  : "text-black hover:bg-white"
              }`}
              onClick={() => handleButton("animal")}
            >
              Animals
            </button>

            <button
               className={`h-10 border rounded-lg  cursor-pointer text-black  mt-2 mb-2 transition ${
                activePage === "addData"
                  ? "bg-[#4a8068] text-white"
                  : "text-black hover:bg-white"
              }`}
              onClick={() => handleButton("addData")}
            >
              AllData
            </button>

            <button
               className={`h-10 border rounded-lg cursor-pointer   text-black  mt-2 mb-2 transition ${
                activePage === "symptoms"
                  ? "bg-[#4a8068] text-white"
                  : "text-black hover:bg-white"
              }`}
              onClick={() => handleButton("symptoms")}
            >
              Symptoms
            </button>
            <button
             className={`h-10 border rounded-lg cursor-pointer    mt-2 mb-2 transition ${
                activePage === "vets"
                  ? "bg-[#4a8068] text-white "
                  : "text-black hover:bg-white"
              }`}
              onClick={() => handleButton("vets")}
            >
              Vets
            </button>
          </div>
        </div>

        {/**main */}
        <div className="w-[90%]  rounded-2xl bg-gray-100 m-2   px-2 py-2">{renderPage()}</div>
      </div>
    </div>
  );
}

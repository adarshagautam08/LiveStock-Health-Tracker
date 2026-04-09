"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Vets = {
  id: string;
  name: string;
  phone: string;
  address: string;
  district: string;
};

type VetForm = {
  name: string;
  phone: string;
  address: string;
  district: string;
};

export default function AddVets() {
  const [allVets, setAllVets] = useState<Vets[]>([]);
  const [select, setSelect] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VetForm>();

  // ✅ Fetch all vets
  const fetchVets = async () => {
    try {
      const res = await fetch("/api/vet");
      const data = await res.json();
      setAllVets(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch vets");
    }
  };

  // ✅ Add vet
  const addDetail = async (data: VetForm) => {
    try {
      const res = await fetch("/api/vet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      reset();
      setSelect(false);
      fetchVets();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // ✅ Delete vet
  const handleDelete = async (item: Vets) => {
    try {
      const res = await fetch(`/api/vet/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setAllVets((prev) => prev.filter((v) => v.id !== item.id));
      toast.success("Vet deleted successfully!");
    } catch {
      toast.error("Failed to delete Vet.");
    }
  };

  useEffect(() => {
    fetchVets();
  }, []); // ✅ correct

  return (
    <div className="p-4">
      {/* Header */}
      <div className="bg-[#2D6A4F] flex justify-between rounded-lg text-xl text-white p-2">
        <h1>All Vets data</h1>
        <button
          onClick={() => setSelect(true)}
          className="bg-blue-400 text-[15px] rounded-lg px-4 cursor-pointer hover:bg-blue-500 transition"
        >
          + Add vets
        </button>
      </div>

      {/* Modal */}
      {select && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[350px] shadow-lg">
            <form onSubmit={handleSubmit(addDetail)} className="space-y-3">
              <p className="text-lg font-semibold">Fill the data</p>

              {/* Name */}
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full border p-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10-digit phone",
                    },
                  })}
                  className="w-full border p-2 rounded"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm mb-1">Address</label>
                <input
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="w-full border p-2 rounded"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm mb-1">District</label>
                <input
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="w-full border p-2 rounded"
                />
                {errors.district && (
                  <p className="text-red-500 text-sm">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-[#2e684e] text-white w-full py-2 rounded hover:bg-[#2a5e47]"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setSelect(false)}
                  className="bg-red-400 text-white w-full py-2 rounded hover:bg-red-500"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div className="mt-4 space-y-3">
        {allVets.map((item) => (
          <div
            key={item.id}
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
              className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
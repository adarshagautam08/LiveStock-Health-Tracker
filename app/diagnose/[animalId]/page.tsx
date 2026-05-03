"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

type DiagnoseResult = {
  id: string;
  name: string;
  description: string;
  treatment: string;
  severity: string;
  score: number;
};

export default function DiagnosePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const animalId = params.animalId;
  const symptoms = useMemo(() => {
    return searchParams.get("symptoms")?.split(",") || [];
  }, [searchParams]);

  const [result, setResult] = useState<DiagnoseResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!animalId || symptoms.length === 0) return;
    const fetchResult = async () => {
      try {
        const res = await fetch("/api/diagosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animalId, symptoms }),
        });
        const data = await res.json();
        setResult(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [animalId, symptoms]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f7f4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Analyzing symptoms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      {/* Header */}
      <div className="bg-[#2D6A4F] px-6 py-8 text-white">
        <div className="max-w-xl mx-auto">
          <p className="text-green-200 text-xs uppercase tracking-widest mb-2">
            Diagnosis Complete
          </p>
          <h1 className="text-2xl font-semibold mb-1">Results</h1>
          <p className="text-green-100 text-sm">
            {symptoms.length} symptom{symptoms.length > 1 ? "s" : ""} analyzed ·{" "}
            {result.length} disease{result.length > 1 ? "s" : ""} found
          </p>

          {/* Selected symptoms */}
          <div className="flex flex-wrap gap-2 mt-4">
            {symptoms.map((s) => (
              <span
                key={s}
                className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
        {result.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-800 mb-1">No matches found</p>
            <p className="text-sm text-gray-500">
              Try selecting different symptoms or consult a vet directly.
            </p>
          </div>
        ) : (
          result.map((disease, index) => (
            <div
              key={disease.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400">
                    #{index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900">{disease.name}</h3>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    disease.severity === "High"
                      ? "bg-red-50 text-red-600"
                      : disease.severity === "Medium"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {disease.severity} severity
                </span>
              </div>

              {/* Match score bar */}
              {disease.score !== undefined && (
                <div className="px-4 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Symptom match</span>
                    <span className="text-xs font-medium text-[#2D6A4F]">
                      {disease.score}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2D6A4F] rounded-full transition-all duration-500"
                      style={{ width: `${disease.score}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="px-4 pb-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {disease.description}
                </p>
              </div>

              {/* Treatment */}
              <div className="bg-[#f0faf5] border-t border-gray-100 px-4 py-3">
                <p className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wide mb-1">
                  Recommended treatment
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {disease.treatment}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Find vet button */}
        <Link
          href="/vet  "
          className="block w-full py-3 text-center border border-[#2D6A4F] text-[#2D6A4F] font-medium rounded-xl hover:bg-[#2D6A4F] hover:text-white transition-all duration-200 mt-2"
        >
          Find a Vet Near You →
        </Link>

        <Link
          href="/diagnose"
          className="block w-full py-3 text-center text-gray-400 text-sm hover:text-gray-600 transition"
        >
          ← Start over
        </Link>
      </div>
    </div>
  );
}
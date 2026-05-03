import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { animalid: string } }
) {
  try {
    const { animalid } = await params;

    // Get animal name from animalId
    const animal = await prisma.animal.findUnique({
      where: { id: animalid }
    });

    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    // Get all training data for this animal
    const trainingData = await prisma.trainingData.findMany({
      where: { animal: animal.name }
    });

    // Extract all unique symptoms from training data
    const allSymptoms = trainingData.flatMap(row =>
      row.symptoms.split('|').map(s => s.trim().toLowerCase())
    );

    const uniqueSymptoms = [...new Set(allSymptoms)].sort();

    // Return in same format as before so frontend works without changes
    const formatted = uniqueSymptoms.map((name, index) => ({
      id: `${index}`,
      name
    }));

    return NextResponse.json(formatted);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
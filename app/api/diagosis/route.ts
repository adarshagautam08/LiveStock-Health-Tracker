import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { animalId, symptoms } = body

    if (!animalId || !symptoms) {
      return NextResponse.json({ error: 'the fields are empty' }, { status: 400 })
    }

    // Get animal name from animalId
    const animal = await prisma.animal.findUnique({
      where: { id: animalId }
    })

    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 })
    }

    // Step 1 — Load training data for this animal
    const trainingData = await prisma.trainingData.findMany({
      where: { animal: animal.name }
    })

    if (trainingData.length === 0) {
      return NextResponse.json({ error: 'No training data found' }, { status: 404 })
    }

    // Step 2 — Get unique diseases for this animal
    const diseases = [...new Set(trainingData.map(row => row.disease))]

    // Step 3 — Calculate Naive Bayes score for each disease
    const totalRows = trainingData.length

    const scored = diseases.map(diseaseName => {
      const diseaseRows = trainingData.filter(row => row.disease === diseaseName)

      // P(disease)
      const pDisease = diseaseRows.length / totalRows

      // P(symptom | disease) with Laplace smoothing
      let pSymptoms = 1
      for (const symptom of symptoms) {
        const symptomCount = diseaseRows.filter(row =>
          row.symptoms.split('|').map(s => s.trim().toLowerCase())
            .includes(symptom.toLowerCase())
        ).length

        const pSymptomGivenDisease = (symptomCount + 1) / (diseaseRows.length + 2)
        pSymptoms *= pSymptomGivenDisease
      }

      const score = pDisease * pSymptoms

      return {
        diseaseName,
        score
      }
    })

    // Step 4 — Sort by score descending
    const ranked = scored
      .filter(d => d.score > 0)
      .sort((a, b) => b.score - a.score)

    // Step 5 — Normalize scores so top result = 100%
    const maxScore = ranked[0]?.score || 1
    const normalizedRanked = ranked.map(d => ({
      ...d,
      score: parseFloat(((d.score / maxScore) * 100).toFixed(1))
    }))

    console.log("Animal name:", animal.name)
    console.log("Training data count:", trainingData.length)
    console.log("Ranked:", normalizedRanked)

    // Step 6 — Get full disease details from DB
    const results = await Promise.all(
      normalizedRanked.map(async (item) => {
        const disease = await prisma.disease.findFirst({
          where: {
            name: item.diseaseName,
            animalId
          },
          include: { symptom: true }
        })
        return {
          ...disease,
          score: item.score
        }
      })
    )

    // Step 7 — Remove nulls and return
    const finalResults = results.filter(r => r.id)

    console.log('Naive Bayes Results:', finalResults)
    return NextResponse.json({ results: finalResults }, { status: 200 })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
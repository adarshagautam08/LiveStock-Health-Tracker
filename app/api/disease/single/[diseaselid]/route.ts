import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ diseaselid: string }> }
) {
  try {
    const { diseaselid } = await params;

    // delete related symptoms first
    await prisma.symptom.deleteMany({
      where: { diseaseId: diseaselid },
    });

    // then delete the disease
    await prisma.disease.delete({ where: { id: diseaselid } });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
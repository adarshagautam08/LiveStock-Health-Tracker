import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { vetId: string } }
) {
  try {
    const { vetId } =await params;

    await prisma.vet.delete({
      where: {
        id: vetId
      }
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
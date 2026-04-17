import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Instead of tag, let's just clear the whole page
  revalidatePath("/"); // Or '/landing-page' if that's your route

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

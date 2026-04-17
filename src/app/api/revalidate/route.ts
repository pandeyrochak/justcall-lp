import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  
  if (tag) {
    revalidateTag(tag, "max");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, message: 'Missing tag' });
}
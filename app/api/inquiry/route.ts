import { NextResponse } from "next/server";

// Full implementation in US-07
export async function POST() {
  return NextResponse.json({ message: "Inquiry API — implement in US-07" }, { status: 501 });
}

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000";

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/groups/${params.groupId}/leave`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = { error: "Unexpected server error. Please try again." };
  }
  return NextResponse.json(data, { status: res.status });
} 
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000";

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  const res = await fetch(`${BACKEND_URL}/groups/${params.groupId}/messages`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/groups/${params.groupId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
} 
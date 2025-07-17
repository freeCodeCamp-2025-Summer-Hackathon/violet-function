import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000";

export async function POST(req: NextRequest, { params }: { params: { invitationId: string } }) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/invitations/${params.invitationId}/respond`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
} 
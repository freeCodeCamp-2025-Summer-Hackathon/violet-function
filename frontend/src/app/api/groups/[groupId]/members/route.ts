import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000";
 
export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  const res = await fetch(`${BACKEND_URL}/groups/${params.groupId}/members`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
} 
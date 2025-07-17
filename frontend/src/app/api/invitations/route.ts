import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  const res = await fetch(`${BACKEND_URL}/invitations?username=${encodeURIComponent(username || "")}`);
  let data = null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { error: "Unexpected server error. Please try again." };
  }
  return NextResponse.json(data, { status: res.status });
} 
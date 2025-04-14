import { NextResponse } from "next/server";

export async function POST(req) {
  const { text } = await req.json();

  const winstonRes = await fetch("https://api.gowinston.ai/v2/plagiarism", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WINSTON_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      language: "en",
      country: "us",
    }),
  });

  if (!winstonRes.ok) {
    return NextResponse.json({ error: "Failed to fetch plagiarism data" }, { status: 500 });
  }

  const data = await winstonRes.json();

  return NextResponse.json(data);
}

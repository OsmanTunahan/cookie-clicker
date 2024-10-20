import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { count, cookiesPerSecond, buildings } = await req.json();

  const gameData = JSON.stringify({ count, cookiesPerSecond, buildings });

  const cookie = `gameProgress=${gameData}; Path=/; Max-Age=${
    7 * 24 * 60 * 60
  }; HttpOnly; Secure`;

  return NextResponse.json(
    { status: true, message: "Progress saved successfully" },
    {
      status: 200,
      headers: { "Set-Cookie": cookie },
    }
  );
}

export async function GET(req: NextRequest) {
  const gameProgress = req.cookies.get("gameProgress")?.value;

  if (!gameProgress) {
    return NextResponse.json(
      {
        status: false,
        message: "No game progress found",
      },
      { status: 404 }
    );
  }

  const { count, cookiesPerSecond, buildings } = JSON.parse(gameProgress);

  return NextResponse.json(
    {
      status: true,
      data: { count, cookiesPerSecond, buildings },
    },
    { status: 200 }
  );
}

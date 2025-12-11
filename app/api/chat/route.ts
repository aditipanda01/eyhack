import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.messages) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const last = body.messages[body.messages.length - 1];
  const prevStage = (body.stage ?? "intro") as
    | "intro"
    | "verification"
    | "underwriting"
    | "offer";

  // dumb stage progression for now – just to test UI
  let nextStage = prevStage;
  if (prevStage === "intro") nextStage = "verification";
  else if (prevStage === "verification") nextStage = "underwriting";
  else if (prevStage === "underwriting") nextStage = "offer";

  return NextResponse.json({
    reply: `Echo: ${last.content}\n\n(Mock response – stage: ${nextStage})`,
    stage: nextStage,
  });
}

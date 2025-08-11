import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

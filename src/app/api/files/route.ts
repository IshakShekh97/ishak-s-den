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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    // Extract CID from the URL
    // Format: https://gateway.domain/ipfs/CID or https://gateway.domain/files/CID
    let cid = "";
    try {
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split("/");

      // Handle different URL formats
      if (pathParts.includes("ipfs")) {
        const ipfsIndex = pathParts.indexOf("ipfs");
        cid = pathParts[ipfsIndex + 1];
      } else if (pathParts.includes("files")) {
        const filesIndex = pathParts.indexOf("files");
        cid = pathParts[filesIndex + 1];
      } else {
        // Last segment might be the CID
        cid = pathParts[pathParts.length - 1];
      }

      if (!cid) {
        throw new Error("Could not extract CID from URL");
      }
    } catch (error) {
      console.error("Error extracting CID from URL:", error);
      return NextResponse.json(
        { error: "Invalid file URL format" },
        { status: 400 }
      );
    }

    // Delete the file from Pinata
    await pinata.files.public.delete([cid]);

    return NextResponse.json(
      { success: true, message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log("Delete error:", e);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}

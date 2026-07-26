import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configuredSecret = process.env.STUDIO_SECRET;
  const suppliedSecret = request.headers.get("x-studio-secret") || "";

  if (!configuredSecret || configuredSecret.length < 16) {
    return NextResponse.json({ message: "Cloudinary studio access is not configured." }, { status: 503 });
  }

  const a = Buffer.from(configuredSecret);
  const b = Buffer.from(suppliedSecret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) return NextResponse.json({ message: "Cloudinary credentials are missing." }, { status: 503 });

  const timestamp = Math.round(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "milano-floral";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");

  return NextResponse.json({ timestamp, signature, apiKey, folder, cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME });
}

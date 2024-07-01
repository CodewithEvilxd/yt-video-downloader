import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import ytdl from "ytdl-core";
export async function POST(request, response) {
  const { url } = await request.json();

  try {
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "The link is invalid" },
        { status: 500 }
      );
    }

    const info = await ytdl.getInfo(url);
    const data = info.videoDetails;
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
    });

    return NextResponse.json({
      status: 200,
      title: data.title,
      thumbnail: data.thumbnails[0].url,
      duration: data.lengthSeconds,
      downloadUrl:format.url
    });
  } catch (error) {
    throw error;
  }
}

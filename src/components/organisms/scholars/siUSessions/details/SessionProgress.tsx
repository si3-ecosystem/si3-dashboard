"use client";

import Image from "next/image";
import { Session } from "@/types/session";
import { urlForImage } from "@/lib/sanity/image";
import { useState } from "react";

interface SessionProgressProps {
  thumbnail?: Session["thumbnail"];
  progress?: number;
  lastActivity?: string | null;
  status?: Session["status"];
  videoUrl?: Session["videoUrl"];
}

export default function SessionProgress({
  thumbnail,
  // progress,
  // lastActivity,
  // status,
  videoUrl,
}: SessionProgressProps) {
  const imageUrl = thumbnail && urlForImage(thumbnail)?.src;
  const [videoError, setVideoError] = useState(false);

  const isLivepeerUrl = videoUrl?.includes("lvpr.tv?v=");
  return (
    <div className="mb-6">
      {(videoUrl || imageUrl) && (
        <div className="relative w-full h-[270px] rounded-lg overflow-hidden">
          {videoUrl && !videoError ? (
            isLivepeerUrl ? (
              <iframe
                src={videoUrl}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                frameBorder="0"
                className="w-full h-full rounded-lg"
                onError={() => setVideoError(true)}
              />
            ) : (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
                onError={() => setVideoError(true)}
              />
            )
          ) : (
            imageUrl && (
              <Image
                src={imageUrl}
                alt="Session Thumbnail"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            )
          )}
        </div>
      )}
      {/* <div className="flex flex-col text-sm sm:flex-row items-center gap-4 bg-[#F9EFFF] rounded-lg py-6 px-3 mt-5 ">
        <div className="flex max-md:flex-wrap gap-4 md:!flex-row items-center  w-full">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className=" text-[#9F44D3] font-bold whitespace-nowrap ">
            {progress}% COMPLETE
          </span>
          <p className="text-black font-medium whitespace-nowrap ">
            Last activity on {lastActivity || "N/A"} 8:30
          </p>
          <span className="  bg-brand text-white  whitespace-nowrap px-3 py-1 rounded-full text-sm">
            {status.toUpperCase().replace("_", " ")}
          </span>
        </div>
      </div> */}
    </div>
  );
}

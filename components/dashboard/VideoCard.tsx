import React from "react";
import { ItemDetails } from "./VideoDefinition";
import {
  EyeIcon,
  HandThumbUpIcon,
  StarIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";

function VideoCard({
  publisedAt,
  imgUrl,
  title,
  Description,
  likeCount,
  commentCount,
  favoriteCount,
  viewCount,
  videoId,
  duration,
  videoType,
  videoDurationSec,
}: ItemDetails) {
  return (
    <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7 }}
        className="h-[500px] w-80 border-2 rounded-xl shrink-0  snap-center   space-y-3 bg-white shadow-2xl mt-[30px]"
      >
        <div className="flex flex-col justify-center items-center ">
          <div className=" p-3 text-sm text-gray-400 font-medium ">{title}</div>
          <img
            src={imgUrl}
            alt=""
            className="object-cover rounded-xl border-b-8 border-gray-400 mt-1 p-2 h-[170px] w-[320px]"
          />
          <div className="grid grid-cols-1 grid-rows-4 w-[80%] gap-y-3 mt-2">
            <div className="flex flex-row justify-between items-center border p-2 rounded-2xl ">
              <div className="flex flex-row space-x-2">
                <EyeIcon className="h-6 w-6 " />
                <p className=" font-mono">Views </p>
              </div>
              <span className="font-semibold">{viewCount}</span>
            </div>

            <div className="flex flex-row justify-between items-center border p-2 rounded-2xl ">
              <div className="flex flex-row space-x-2">
                <HandThumbUpIcon className="h-6 w-6 " />
                <p className=" font-mono">Likes </p>
              </div>
              <span className="font-semibold">{likeCount}</span>
            </div>

            <div className="flex flex-row justify-between items-center border p-2 rounded-2xl ">
              <div className="flex flex-row space-x-2">
                <ChatBubbleBottomCenterIcon className="h-6 w-6 " />
                <p className=" font-mono">Comments </p>
              </div>
              <span className="font-semibold">{commentCount}</span>
            </div>

            {/* <div className="flex flex-row justify-between items-center  p-2 rounded-2xl ">
            <span className="font-semibold">{videoId}</span>
          </div> */}

            <div className="flex flex-row justify-between mt-3">
              <div className="flex flex-row justify-between items-center  p-2 rounded-2xl ">
                <span className="font-semibold">
                  {format(publisedAt, "yyyy-MM-dd hh:mm a")}
                </span>
              </div>
              <div className="flex flex-row justify-between items-center  p-2 rounded-2xl ">
                <span className="font-semibold">{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default VideoCard;

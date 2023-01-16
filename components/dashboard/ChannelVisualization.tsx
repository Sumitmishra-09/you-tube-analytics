import axios from "axios";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { IoMdAddCircle } from "react-icons/io";

import React, { useEffect, useRef, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { channelIdState, selectedDateState } from "./InputSelectionComponent";
import SummaryCard from "./SummaryCard";
import VideoCard from "./VideoCard";
import {
  Convert,
  ItemDetails,
  Statistics,
  VideoType,
  Welcome,
} from "./VideoDefinition";

import channelJson from "../../resources/channel_json.json";
import videoJson from "../../resources/video_json.json";

import convertISO8601ToStringWithColons from "../../Util/convertISO8601ToStringWithColons";
import { FilterProps, selectedFilterStateAtom } from "./FilterSelection";
import { videoItemDetails } from "./Dashboard";

interface ChannelSummary {
  totalVideoCount: number;
  totalLikeCount: number;
  totalCommentCount: number;
  totalFavoriteCount: number;
  totalViewCount: number;
}

export const mouseDown = atom({
  key: "mouseDown",
  default: false,
});

export const selectionFilterEnabled = atom({
  key: "selectionFilterEnabled",
  default: false,
});

function ChannelVisualization() {
  const [summaryData, setSummaryData] = useState<ChannelSummary>();

  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const [isMouseDown, setIsMouseDown] = useRecoilState(mouseDown);
  const [isselectionFilterEnabled, setIsselectionFilterEnabled] =
    useRecoilState(selectionFilterEnabled);

  const [channelId, setChannelId] = useRecoilState(channelIdState);
  const [selectedFilterState, setselectedFilterState] =
    useRecoilState<FilterProps>(selectedFilterStateAtom);

  const [videDetails, setVideDetails] = useRecoilState(videoItemDetails);
  const [filteredVideoDetails, setFilteredVideoDetails] =
    useState<ItemDetails[]>();

  useEffect(() => {
    populateSummarydata();
  }, [filteredVideoDetails]);

  useEffect(() => {
    updateChannelDetail();
  }, [selectedFilterState]);

  const updateChannelDetail = () => {
    setFilteredVideoDetails([]);

    console.log({ selectedFilterState });
    let filteredChannelDetails = [];

    if (selectedFilterState.videoType === VideoType.all) {
      filteredChannelDetails = [...videDetails].sort(
        sortingFunc(selectedFilterState)
      );
    } else {
      filteredChannelDetails = videDetails
        .filter((obj) => obj.videoType === selectedFilterState.videoType)
        .sort(sortingFunc(selectedFilterState));
    }

    if (selectedFilterState.order === "desc") {
      filteredChannelDetails.reverse();
    }

    console.log({ filteredChannelDetails });
    setFilteredVideoDetails(filteredChannelDetails);
  };

  function populateSummarydata() {
    let totalLCount: number = 0;
    let totalVCount: number = 0;
    let totalCCount: number = 0;
    let totalFCount: number = 0;
    let totalViewCounts: number = 0;

    filteredVideoDetails?.forEach((videoSummaryData) => {
      totalVCount = totalVCount + 1;
      totalLCount = totalLCount + Number(videoSummaryData.likeCount);
      totalCCount = totalCCount + Number(videoSummaryData.commentCount);
      totalFCount = totalFCount + Number(videoSummaryData.favoriteCount);
      totalViewCounts = totalViewCounts + Number(videoSummaryData.viewCount);
    });

    setSummaryData({
      totalVideoCount: totalVCount,
      totalLikeCount: totalLCount,
      totalCommentCount: totalCCount,
      totalFavoriteCount: totalFCount,
      totalViewCount: totalViewCounts,
    });
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(true);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleOnWheel = (e: React.WheelEvent) => {
    var container = document.getElementById("container");
    container?.scrollBy(e.deltaY, 0);
  };

  return (
    <div className={`flex flex-col  h-[100%] w-[100%] `}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-row justify-around p-5 border bg-white mt-10 ml-[30px] mr-[30px] rounded-xl max-w-[100%]"
      >
        <div className="text-sm text-gray-400  uppercase">
          CHANNEL ID{" "}
          <div className="text-gray-500 font-extrabold text-lg">
            {" "}
            {channelId}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          PUBLISHED DATE{" "}
          <div className="text-gray-500 font-extrabold text-lg">
            {format(parseISO(selectedDate.toISOString()), "yyyy-MM-dd")}
          </div>
        </div>
      </motion.div>

      <div
        className="flex flex-row  mt-14 overflow-x-scroll max-w-[100%] 
        scrollbar-hidden ml-[30px]  mr-[30px] justify-between p-5"
      >
        <SummaryCard
          parameterName="VIDEO COUNT"
          value={summaryData?.totalVideoCount ? summaryData.totalVideoCount : 0}
          borderColor="border-b-blue-200"
        />
        <SummaryCard
          parameterName="VIEW COUNT"
          value={summaryData?.totalViewCount ? summaryData.totalViewCount : 0}
          borderColor=" border-b-orange-200"
        />
        <SummaryCard
          parameterName="LIKE COUNT"
          value={summaryData?.totalLikeCount ? summaryData.totalLikeCount : 0}
          borderColor=" border-b-green-200"
        />
        <SummaryCard
          parameterName="COMMENT COUNT"
          value={
            summaryData?.totalCommentCount ? summaryData.totalCommentCount : 0
          }
          borderColor=" border-b-purple-200"
        />
        <SummaryCard
          parameterName="AVG. VIEW COUNT"
          value={
            summaryData?.totalVideoCount
              ? Math.floor(
                  summaryData.totalViewCount / summaryData?.totalVideoCount
                )
              : 0
          }
          borderColor=" border-b-yellow-200"
        />
      </div>

      <div className="flex flex-row w-[100%]  ml-[30px]  rounded-2xl justify-start p-2">
        <div
          className="flex flex-row justify-center items-center bg-blue-300 rounded-2xl
             w-40 h-16 border  hover:bg-blue-500 hover:cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => setIsselectionFilterEnabled(true)}
        >
          <div className="  text-gray-200 font-bold text-lg p-2">
            Add Filters
          </div>
          <IoMdAddCircle className="h-10 w-10" />
        </div>
      </div>
      <div
        onWheel={handleOnWheel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="container"
        className="flex flex-row  max-w-[100%]   overflow-x-scroll ml-[30px] mr-[30px]
           border-2  scrollbar-hidden hover:cursor-pointer space-x-10 h-[600px] "
      >
        {filteredVideoDetails?.map((item) => {
          return (
            <VideoCard
              key={item.videoId}
              publisedAt={item.publisedAt}
              imgUrl={item.imgUrl}
              title={item.title}
              Description={item.Description}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
              favoriteCount={item.favoriteCount}
              viewCount={item.viewCount}
              videoId={item.videoId}
              duration={item.duration}
              videoType={item.videoType}
              videoDurationSec={item.videoDurationSec}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChannelVisualization;
function sortingFunc(
  selectedFilterState: FilterProps
): ((a: ItemDetails, b: ItemDetails) => number) | undefined {
  return (a, b) => {
    if (selectedFilterState.sortingParameter === "views") {
      console.log("sorting on views");
      if (a.viewCount > b.viewCount) {
        return 1;
      }
    } else if (selectedFilterState.sortingParameter === "publised date") {
      if (a.publisedAt > b.publisedAt) {
        return 1;
      }
    } else if (selectedFilterState.sortingParameter === "duration") {
      if (a.videoDurationSec > b.videoDurationSec) {
        return 1;
      }
    }

    return -1;
  };
}

import axios from "axios";
import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { channelIdState, selectedDateState } from "./InputSelectionComponent";
import { Convert, Statistics, Welcome } from "./VideoDefinition";

interface ChannelSummary {
  totalVideoCount: number;
  totalLikeCount: number;
  totalCommentCount: number;
  totalFavoriteCount: number;
}

function ChannelVisualization() {
  const [data, setData] = useState<Welcome>();
  const [summaryData, setSummaryData] = useState<ChannelSummary>();
  const [channelId, setChannelId] = useRecoilState(channelIdState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const va = selectedDate.toString();

  const getVideos = async () => {
    await axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?channelId=UCd2CBMSZfehum13I_SLM9AQ&publishedAfter=2022-04-01T00:00:00Z&maxResults=48&pageToken=&part=snippet&order=date&key=AIzaSyCecTLyrNpM6NCQVSd3ivgs-YHRiYwt6e0"
      )
      .then(({ data }) => {
        console.log(data);
        const welcome = Convert.toWelcome(JSON.stringify(data));
        setData(welcome);
      });
  };

  const getVideoDetail = async (videoId: string): Promise<Statistics> => {
    let videoSummaryData = {} as Statistics;
    console.log("video called " + videoId);
    await axios
      .get(
        "https://www.googleapis.com/youtube/v3/videos?id=UijW0hZ6evI&key=AIzaSyDEzHBamBTQ4zWHfaXCM-x2SyBiKqscOZk&channelId=UCd2CBMSZfehum13I_SLM9AQ&part=snippet,statistics"
      )
      .then(({ data }) => {
        console.log("fetch called" + JSON.stringify(data));
        const videoDetails = Convert.toWelcome(JSON.stringify(data));

        videoSummaryData = videoDetails.items[0].statistics;
        console.log("detaiasddddddd " + JSON.stringify(videoSummaryData));
      });

    return videoSummaryData;
  };

  useEffect(() => {
    getVideos();
    populateChannelSummary();
  }, []);

  function populateChannelSummary() {
    let totalLCount: number = 0;
    let totalVCount: number = 0;
    let totalCCount: number = 0;
    let totalFCount: number = 0;

    data?.items.forEach((item) => {
      totalVCount = totalVCount + 1;
      getVideoDetail(item.id.videoId)
        .then((stats) => {
          totalLCount = totalLCount + Number(stats.likeCount);
          totalVCount = totalVCount + Number(stats.viewCount);
          totalCCount = totalCCount + Number(stats.commentCount);
          totalFCount = totalFCount + Number(stats.favoriteCount);
        })
        .then(() => {
          setSummaryData({
            totalVideoCount: totalVCount,
            totalLikeCount: totalLCount,
            totalCommentCount: totalCCount,
            totalFavoriteCount: totalFCount,
          });
        });
    });
  }

  return (
    <div className="flex flex-col p-10 overflow-hidden h-[100%] w-[100%] ">
      <div className="flex flex-row justify-between items-center border m-5 p-5">
        <div className="w-16 h-16 rounded-lg border border-green-300  ">
          {summaryData?.totalCommentCount}+{summaryData?.totalFavoriteCount}+
          {summaryData?.totalLikeCount}
        </div>
      </div>
    </div>
  );
}

export default ChannelVisualization;

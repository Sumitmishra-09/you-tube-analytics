import axios from "axios";
import { stringify } from "querystring";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Convert,
  Item,
  ItemDetails,
  VideoType,
  Welcome,
} from "./VideoDefinition";
import { DateRange } from "react-date-range";
import InputSelectionComponent, {
  channelIdState,
  selectedDateState,
} from "./InputSelectionComponent";
import ChannelVisualization, {
  mouseDown,
  selectionFilterEnabled,
} from "./ChannelVisualization";
import { atom, useRecoilState } from "recoil";
import FilterSelection, {
  FilterProps,
  selectedFilterStateAtom,
} from "./FilterSelection";
import convertISO8601ToStringWithColons from "../../Util/convertISO8601ToStringWithColons";
import { format } from "date-fns";

export const videoItemDetails = atom<ItemDetails[]>({
  key: "videoItemDetails",
  default: [],
});

export const globalSelectedKeyAtom = atom({
  key: "selectedKeyAtom",
  default: "",
});

function Dashboard() {
  const [enableDataVisualization, setEnableDataVisualization] = useState(false);
  const [isMouseDown, setIsMouseDown] = useRecoilState(mouseDown);
  const [isselectionFilterEnabled, setIsselectionFilterEnabled] =
    useRecoilState(selectionFilterEnabled);
  const [data, setData] = useState<Welcome>();
  const [videDetails, setVideDetails] = useRecoilState(videoItemDetails);
  const [channelId, setChannelId] = useRecoilState(channelIdState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [globalSelectedKey, setGlobalSelectedKey] = useRecoilState(
    globalSelectedKeyAtom
  );
  const [selectedKey, setSelectedKey] = useState("");
  const [isLoading, setLoading] = useState(true);

  function handleDataSubmission() {
    setEnableDataVisualization(true);
  }

  const getVideos = async (nextPagetoken: string): Promise<Welcome> => {
    let url =
      "https://www.googleapis.com/youtube/v3/search?channelId=" +
      channelId +
      "&publishedAfter=" +
      selectedDate.toISOString() +
      "&maxResults=48&pageToken=" +
      nextPagetoken +
      "&part=snippet&order=date&key=" +
      globalSelectedKey;

    console.log({ url });

    return await axios.get(url).then((response) => {
      const welcome = Convert.toWelcome(JSON.stringify(response.data));

      return welcome;
    });
  };

  const getAllVideos = async () => {
    let items: Item[] = [];
    let response = await getVideos("");
    items = response.items;

    while (response.nextPageToken) {
      console.log(response.nextPageToken);
      response = await getVideos(response.nextPageToken);
      items.push(...response.items);
    }

    response.items = items;

    setData(response);
  };

  useEffect(() => {
    if (channelId.length > 1) {
      getAllVideos();
      setLoading(false);
    }
  }, [channelId, selectedDate, globalSelectedKey]);

  useEffect(() => {
    setVideDetails([]);
    populateChannelDetail();
  }, [data]);

  const getVideoDetail = async (videoId: string) => {
    let videoSummaryData = {} as ItemDetails;
    console.log("video called " + videoId);

    // const videoDetaulResponse = Convert.toWelcome(JSON.stringify(videoJson));
    // videoSummaryData = mapItemDetails(videoDetaulResponse);

    // return videoSummaryData;

    await axios
      .get(
        "https://www.googleapis.com/youtube/v3/videos?id=" +
          videoId +
          "&key=" +
          globalSelectedKey +
          "+&channelId=" +
          channelId +
          "&part=snippet,statistics,contentDetails"
      )
      .then(({ data }) => {
        const videoDetaulResponse = Convert.toWelcome(JSON.stringify(data));
        videoSummaryData = mapItemDetails(videoDetaulResponse, videoId);
        setVideDetails((prevData) => [...prevData, videoSummaryData]);
      });
  };

  function populateChannelDetail() {
    console.log("population called" + data?.items);
    data?.items.forEach((item) => {
      getVideoDetail(item.id.videoId);
    });
  }

  const mapItemDetails = (videoData: Welcome, videoId: string): ItemDetails => {
    let itemDetail = {} as ItemDetails;
    let videoDurationInSec = 0 as number;

    const videoDuration = convertISO8601ToStringWithColons(
      videoData.items[0].contentDetails.duration
    );

    const videoDurationArray = videoDuration.split(":");

    switch (videoDurationArray.length) {
      case 3:
        videoDurationInSec =
          Number(videoDurationArray[0]) * 3600 +
          Number(videoDurationArray[1]) * 60 +
          Number(videoDurationArray[2]);
        break;
      case 2:
        videoDurationInSec =
          Number(videoDurationArray[0]) * 60 + Number(videoDurationArray[1]);
        break;
      default:
        videoDurationInSec = Number(videoDurationArray[0]);
        break;
    }

    itemDetail = {
      commentCount: videoData.items[0].statistics.commentCount,
      Description: videoData.items[0].snippet.description,
      favoriteCount: videoData.items[0].statistics.favoriteCount,
      imgUrl: videoData.items[0].snippet.thumbnails.maxres
        ? videoData.items[0].snippet.thumbnails.maxres.url
        : videoData.items[0].snippet.thumbnails.standard.url,
      likeCount: videoData.items[0].statistics.likeCount,
      // format(videoData.items[0].snippet.publishedAt, "yyyy-MM-dd")
      publisedAt: new Date(videoData.items[0].snippet.publishedAt),
      videoDurationSec: videoDurationInSec,
      title: videoData.items[0].snippet.title,
      viewCount: Number(videoData.items[0].statistics.viewCount),
      videoId: videoId,
      duration: videoDuration,
      videoType:
        videoDurationInSec <= 60 ? VideoType.short : VideoType.standard,
    };

    return itemDetail;
  };

  return (
    <div
      className={`overflow-x-hidden w-screen  h-screen ${
        isMouseDown ? "overflow-hidden" : "overflow-y-auto"
      }     relative `}
    >
      <div
        className={`   ${
          isselectionFilterEnabled ? "opacity-20" : "opacity-100"
        } `}
      >
        {enableDataVisualization === false ? (
          <div className="flex flex-col justify-center items-center ">
            <div className=" bg-white p-5 mt-36 flex flex-col space-y-5 rounded-xl w-[600px] ">
              <input
                onChange={(e) => setSelectedKey(e.target.value)}
                className="outline-none shadow-2xl flex-grow rounded-full shadow-orange-200 text-lg tracking-widest border p-2"
              />

              <span
                onClick={() => setGlobalSelectedKey(selectedKey)}
                className="text-lg font-semibold tracking-widest border
               p-2 rounded-full hover:cursor-pointer hover:bg-gray-300 w-[350px] text-center m-auto"
              >
                ADD API KEY TO PROCEED
              </span>
            </div>
            <InputSelectionComponent dataVisualization={handleDataSubmission} />
          </div>
        ) : !isLoading ? (
          <ChannelVisualization />
        ) : (
          <div className="w-40 h-40 rounded-full animate-spin" />
        )}
      </div>

      <FilterSelection />
    </div>
  );
}

export default Dashboard;

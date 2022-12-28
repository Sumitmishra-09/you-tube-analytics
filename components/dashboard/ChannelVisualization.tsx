import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { channelIdState, selectedDateState } from "./InputSelectionComponent";
import { Convert, Welcome } from "./VideoDefinition";

function ChannelVisualization() {
  const [data, setData] = useState<Welcome>();
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

  useEffect(() => {
    // getVideos();
  }, []);

  return <div className="flex flex-row p-10 overflow-hidden">{va}</div>;
}

export default ChannelVisualization;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var config = {
    method: "get",
    url: "https://www.googleapis.com/youtube/v3/search?channelId=UCd2CBMSZfehum13I_SLM9AQ&publishedAfter=2022-04-01T00:00:00Z&maxResults=48&pageToken=&part=snippet&order=date&key=AIzaSyDEzHBamBTQ4zWHfaXCM-x2SyBiKqscOZk",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

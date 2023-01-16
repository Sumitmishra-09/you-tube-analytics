export interface ItemDetails {
  publisedAt: Date;
  imgUrl: string;
  title: string;
  Description: string;
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
  viewCount: number;
  videoId: string;
  duration: string;
  videoType: VideoType;
  videoDurationSec: number;
}

export enum VideoType {
  short = "SHORTS",
  standard = "STANDARD",
  all = "ALL",
}

export interface Welcome {
  kind: string;
  etag: string;
  regionCode: string;
  prevPageToken: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
  statistics: Statistics;
  contentDetails: ContentDetails;
}

export interface ID {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: Date;
  tags: String[];
}

export interface ContentDetails {
  duration: string;
}

export interface Statistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
}

export interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
  maxres: Default;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toWelcome(json: string): Welcome {
    return JSON.parse(json);
  }

  public static welcomeToJson(value: Welcome): string {
    return JSON.stringify(value);
  }
}

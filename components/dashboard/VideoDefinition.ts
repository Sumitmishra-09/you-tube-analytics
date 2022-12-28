export interface ItemDetails {
  publisedAt: String;
  imgUrl: String;
  title: String;
  Description: String;
}

export interface Welcome {
  kind: string;
  etag: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
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
}

export interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
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

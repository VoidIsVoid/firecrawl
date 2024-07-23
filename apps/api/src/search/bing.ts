import axios from "axios";
import dotenv from "dotenv";
import { SearchResult } from "../lib/entities";

dotenv.config();

export async function bing_search(q, options: {
    tbs?: string;
    filter?: string;
    lang?: string;
    country?: string;
    location?: string;
    num_results: number;
    page?: number;
}): Promise<SearchResult[]> {
  let data = JSON.stringify({
    q,
    cc: "zh",
    count: options.num_results,
    textDecorations: true,
    textFormat: "HTML",
  });

  let config = {
    method: "GET",
    url: "https://api.bing.microsoft.com/v7.0/search",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY,
      "Accept-Language": "zh-CN,zh",
    },
    params: data,
  };
  const response = await axios(config);
  if (response && response.data && Array.isArray(response.data?.webPages?.value)) {
    return response.data?.webPages?.value.map((a) => ({
      url: a.url,
      title: a.name,
      description: a.snippet,
    }));
  }else{
    return [];
  }
}

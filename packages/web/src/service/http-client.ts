import HermesHttp from "hermes-http";
import { BASE_URL } from "../service/endpoints";

export const httpClient = HermesHttp({
  baseUrl: BASE_URL
});

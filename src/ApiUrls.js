// src/ApiUrls.js
import { config } from "./config";

const apiUrl = config.api.url;

const APIMapping = {
  columnMapping: `${apiUrl}/v1/report-config/column-mapping`,
  // Add other APIs if needed
};

export default function getAPIMap(key) {
  return APIMapping[key];
}

const APIMap = {
  columnMapping: "/v1/report-config/column-mapping",
};

export default function getAPIMap(key) {
  return APIMap[key];
}

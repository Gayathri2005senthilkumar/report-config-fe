const getAPIMap = (key) => {
  const map = {
    columnMapping: "/v1/report-config/column-mapping",
    // add more API paths here if needed
  };
  return map[key];
};

export default getAPIMap;

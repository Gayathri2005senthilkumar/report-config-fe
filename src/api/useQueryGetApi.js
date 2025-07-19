import apiFunction from "./apiFunction";
import getAPIMap from "./ApiUrls";

const useQueryGetpi = async (keys) => {
    try {
      const url = `${getAPIMap(keys.queryKey[0])}${keys.queryKey[1]}`;
      const response = await apiFunction({ method: "get", url });
      return response.data;
    } catch(err) {
        return err.message || err;
    }
    }

    export default useQueryGetpi;
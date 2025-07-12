import api from "./api"
import getAPIMap from "./ApiUrls";

const apiFunction = (data) => {
data.url = getAPIMap(data.url) || data.url;    
debugger;
return api(data);
}
export default apiFunction;
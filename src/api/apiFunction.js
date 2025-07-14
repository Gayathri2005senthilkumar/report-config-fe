// src/api/apiFunction.js
import api from "./api";
import getAPIMap from "./ApiUrls";

const apiFunction = async (data) => {
  try {
    const finalUrl = getAPIMap(data.url) || data.url;

    console.log("🔁 Final API URL:", finalUrl);
    console.log("📤 API Payload:", data.data);

    const response = await api({
      ...data,
      url: finalUrl,
    });

    console.log("✅ API Success:", response);
    return response;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};

export default apiFunction;

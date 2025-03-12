import { APP_URL } from "@/Config";

export const fetchApi = async ({
  endpoint = "",
  data = {},
  method = "POST",
  headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  },
}) => {
  const App_Url = APP_URL + endpoint;
  const options = {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(App_Url, options);
    if (!response.ok) {
      let responseData = {
        message: "An error occour please try again!",
        status: 500,
      };
      try {
        const res = await response.json();
        responseData.message = res.message || responseData.message;
        responseData.status = res.status;
      } catch (error) {
        console.error(error);
      }

      return responseData;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
  }
};

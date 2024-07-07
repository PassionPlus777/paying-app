import axios from "axios";

// Setting a base URL for all requests
axios.defaults.baseURL = import.meta.env.VITE_API_BACKEND_URL;

axios.defaults.headers.post["Content-Type"] = "application/json";

interface requestProps {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  data?: object;
  auth?: boolean;
}

export default async ({ method, url, data, auth }: requestProps) => {
  // Prepare the headers based on whether auth is true
  const headers = auth
    ? {
        Authorization: "Bearer " + localStorage.getItem("axios_token"),
      }
    : {};

  // Make the request with the appropriate headers
  const res = await axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });

  return res;
};

import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_API_URL;

const postRequest = async ({ body, query, params, endPoint }) => {
  return await axios.post(
    `${baseURL}/${endPoint}/${params ? params : ""}`,
    body,
    {
      params: query,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const getRequest = async ({ query, params, endPoint }) => {
  return await axios.get(`${baseURL}/${endPoint}/${params ? params : ""}`, {
    params: query,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { postRequest, getRequest, baseURL };

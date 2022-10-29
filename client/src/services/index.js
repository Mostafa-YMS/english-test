import { getRequest, postRequest } from "../connection/network";

const wordsApi = "words";
const rankApi = "rank";

export const getWordsService = async () => {
  try {
    const { data } = await getRequest({
      endPoint: wordsApi,
    });

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const submitScoreService = async ({ score }) => {
  try {
    const { data } = await postRequest({
      endPoint: rankApi,
      body: { score },
    });

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

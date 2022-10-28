import { getRequest } from "../connection/network";

const wordsApi = "words";

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

import axios from "axios";
import { useState } from "react";

export const usePost = () => {
  const [statePost, setStatePost] = useState({
    responsePost: null,
    loadingPost: false,
    errorPost: null,
  });

  const postData = async (url, body) => {
    setStatePost({ responsePost: null, loadingPost: true, errorPost: null });
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setStatePost({
        responsePost: data,
        loadingPost: false,
        errorPost: null,
      });
    } catch (error) {
      setStatePost({
        responsePost: null,
        loadingPost: false,
        errorPost: error.message,
      });
      console.error("", error.message);
    }
  };

  return {
    postData,
    ...statePost,
  };
};

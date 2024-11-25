import axios from "axios";
import { useState } from "react";

export const useManualGet = () => {
  const [stateGet, setStateGet] = useState({
    responseGet: null,
    loadingGet: false,
    errorGet: null,
  });

  const getData = async (url) => {
    if (!url) return;

    setStateGet((prev) => ({ ...prev, loadingGet: true }));
    try {
      const { data } = await axios.get(url);
      setStateGet({
        responseGet: data,
        loadingGet: false,
        errorGet: null,
      });
    } catch (error) {
      setStateGet({
        responseGet: null,
        loadingGet: false,
        errorGet: error.message,
      });
      console.error("Error en getData: ", error.message);
    }
  };

  return { ...stateGet, getData };
};

import axios from "axios";
import { useEffect, useState } from "react";

export const useGet = (url) => {
  const [stateGet, setStateGet] = useState({
    responseGet: [],
    loadingGet: true,
    errorGet: null,
  });

  const getData = async () => {
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

  useEffect(() => {
    if (!url) return;

    getData();
  }, [url]);

  return {
    ...stateGet,
    getData,
  };
};

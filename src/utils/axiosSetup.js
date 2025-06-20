import axios from "axios";
import { store } from "../store/store";
import { setLoading } from "../store/loadingSlice";

axios.interceptors.request.use((config) => {
  if (!config.skipLoading) {
    store.dispatch(setLoading(true));
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (!response.config.skipLoading) {
      store.dispatch(setLoading(false));
    }
    return response;
  },
  (error) => {
    if (error.config && !error.config.skipLoading) {
      store.dispatch(setLoading(false));
    }
    return Promise.reject(error);
  }
);

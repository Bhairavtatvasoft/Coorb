import axios from "axios";
import { errorToast } from "../components/common/ToastMsg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RequestArr: string[] = [];

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    removeRequest(response.request.responseURL);
    return response;
  },
  (error) => {
    removeRequest(error.request.responseURL);

    if (error.response && error.response.status === 401) {
      alert("unauthorized");
    }
    if (error.response?.data?.message) {
      errorToast(error.response.data?.message);
    } else {
      errorToast("Something went wrong");
    }
    return Promise.reject(error);
  }
);

class ApiRequest {
  get = async (url: string, queryParams?: any) => {
    updateRequestArr(url);
    return await axiosInstance.get(url, { params: queryParams });
  };

  post = async (url: string, data: any) => {
    updateRequestArr(url);
    return await axiosInstance.post(url, data);
  };

  put = async (url: string, data: any) => {
    updateRequestArr(url);
    return await axiosInstance.put(url, data);
  };

  delete = async (url: string) => {
    updateRequestArr(url);
    return await axiosInstance.delete(url);
  };
}

const updateRequestArr = (url: string) => {
  RequestArr.push(BASE_URL + url);
  if (RequestArr.length) {
    showLoader();
  }
};

const showLoader = () => {
  //add class name
};

const hideLoader = () => {
  // remove class name
};

const removeRequest = (req: string) => {
  const i = RequestArr.indexOf(req);
  if (i >= 0) {
    RequestArr.splice(i, 1);
  }
  if (RequestArr.length > 0) {
    showLoader();
  } else {
    hideLoader();
  }
};

export const apiRequest = new ApiRequest();

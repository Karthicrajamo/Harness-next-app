import api from "./axiosClient";


export const getRequest = async (url, params) => {
  const res = await api.get(url, { params });
  return res;
};

export const postRequest = async (url, payload, params) => {
  console.log("first");
  const res = await api.post(url, payload, {
    params,
  });
  console.log(res, "=======>");
  return res;
};

export const putRequest = async (url, payload, params) => {
  const res = await api.put(url, payload, { params });
  return res;
};

export const deleteRequest = async (url, params) => {
  const res = await api.delete(url, { params });
  return res;
};

export const patchRequest = async (url, payload, params) => {
  const res = await api.patch(url, payload, { params });
  return res;
};

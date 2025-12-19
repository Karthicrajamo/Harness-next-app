import api from "./axiosClient";

export const getRequest = async (
  url: string,
  params: Record<string, unknown>
) => {
  const res = await api.get(url, { params });
  return res;
};

export const postRequest = async (
  url: string,
  payload: Record<string, unknown>,
  params: Record<string, unknown>
) => {
  console.log("first");
  const res = await api.post(url, payload, {
    params,
  });
  console.log(res, "=======>");
  return res;
};

export const putRequest = async (
  url: string,
  payload: Record<string, unknown>,
  params: Record<string, unknown>
) => {
  const res = await api.put(url, payload, { params });
  return res;
};

export const deleteRequest = async (
  url: string,
  params: Record<string, unknown>
) => {
  const res = await api.delete(url, { params });
  return res;
};

export const patchRequest = async (
  url: string,
  payload: Record<string, unknown>,
  params: Record<string, unknown>
) => {
  const res = await api.patch(url, payload, { params });
  return res;
};

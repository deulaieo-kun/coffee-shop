import { get, put, deleteMethod } from "../../utilities/https";

export const getAllReviews = () => {
  const url = "/review/all";
  return new Promise((resolve, reject) => {
    const promise = get(url);
    promise
      .then((response) => {
        resolve({
          type: "SAVE_REVIEW_LIST",
          payload: response,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addReview = (body) => {
  const url = "/review/add";
  return new Promise((resolve, reject) => {
    const promise = put(url, body);
    promise
      .then((response) => {
        resolve({
          type: "SAVE_REVIEW_LIST",
          payload: response,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteReview = (reviewId) => {
  const url = `/review/delete/${reviewId}`;
  return new Promise((resolve, reject) => {
    const promise = deleteMethod(url);
    promise
      .then((response) => {
        resolve({
          type: "SAVE_REVIEW_LIST",
          payload: response,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

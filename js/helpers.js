import { months } from "./constants.js";

export const getDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;

  const updatedMonth = months[month - 1];

  return day + " " + updatedMonth;
};

export const trimString = (text, max) => {
  if (text.length < max) {
    return text;
  } else {
    return text.slice(0, max) + "...";
  }
};

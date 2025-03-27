import config from "config.json";
import { getCookie } from "./cookies";
export const requestConfirmCode = async (email: string) => {
  let url = config.API_URL + "auth/confirmation-code";
  let csrf_token = getCookie("csrf_token");
  let res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrf_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  return res.ok;
};

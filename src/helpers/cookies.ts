import config from "config.json";
export function getCookie(name: string) {
  const value: string = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export async function setCsrf() {
  let csrfUrl = config.API_URL + "auth/csrf-token";
  let csrfSetRes = await fetch(csrfUrl, {
    credentials: "include",
  }); // set csrf
  return csrfSetRes;
}

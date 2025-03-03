import { Dayjs } from "dayjs";
import { AuthorizationCode } from "simple-oauth2";

const LOCAL_STORAGE_ZOOM_TOKEN = "zoomToken";

export const zoomOauthClient = new AuthorizationCode({
  client: {
    id: import.meta.env.VITE_ZOOM_CLIENT_ID,
    secret: import.meta.env.VITE_ZOOM_CLIENT_SECRET,
  },
  auth: {
    authorizeHost: "https://zoom.us",
    tokenHost: "http://localhost:5173",
    tokenPath: "/zoom-oauth/oauth/token",
  },
});

export const saveToken = async (code: string) => {
  const { token } = await zoomOauthClient.getToken({
    code,
    redirect_uri: "http://localhost:5173/oauth-callback",
    scope: ["meeting:write:meeting"],
  });

  localStorage.setItem(LOCAL_STORAGE_ZOOM_TOKEN, JSON.stringify(token));

  return token.access_token;
};

export const createEvent = async ({
  startTime,
  endTime,
  object,
}: {
  startTime: Dayjs;
  endTime: Dayjs;
  object: string;
}) => {
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_ZOOM_TOKEN);
  if (!localStorageToken) {
    throw new Error("Not connected to Zoom");
  }

  const token = zoomOauthClient.createToken(JSON.parse(localStorageToken));

  await fetch("/api/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_time: startTime.toISOString(),
      duration: endTime.diff(startTime, "minutes"),
      timezone: "Europe/Paris",
      topic: object,
      type: 2,
    }),
  });
};

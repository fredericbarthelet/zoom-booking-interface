import { Dayjs } from "dayjs";
import { AuthorizationCode } from "simple-oauth2";

const LOCAL_STORAGE_ZOOM_TOKEN = "zoomToken";

export const zoomOauthClient = new AuthorizationCode({
  client: {
    id: import.meta.env.VITE_ZOOM_CLIENT_ID,
    secret: import.meta.env.VITE_ZOOM_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://zoom.us/oauth",
  },
});

export const saveToken = async (code: string) => {
  const { token } = await zoomOauthClient.getToken({
    code,
    redirect_uri: "http://localhost:5173/oauth-callback",
  });

  localStorage.setItem(LOCAL_STORAGE_ZOOM_TOKEN, JSON.stringify(token));
};

export interface ZoomEvent {
  topic: string;
  start_time: string;
  duration: number; // in minutes
  timezone: string;
}

export class ZoomClient {
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async createEvent(
    topic: string,
    startTime: Dayjs,
    endTime: Dayjs
  ): Promise<ZoomEvent> {
    // Calculate duration in minutes
    const durationMinutes = endTime.diff(startTime, "minute");

    const event: ZoomEvent = {
      topic,
      start_time: startTime.toISOString(),
      duration: durationMinutes,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    // TODO: Implement actual Zoom API call here
    // This would involve:
    // 1. Getting an access token using apiKey and apiSecret
    // 2. Making a POST request to Zoom meetings endpoint
    // 3. Handling the response

    return event;
  }
}

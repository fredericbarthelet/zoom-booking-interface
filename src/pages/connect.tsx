import { zoomOauthClient } from "@/services/zoom";

export const ConnectPage = () => {
  const onConnect = () => {
    const authUrl = zoomOauthClient.authorizeURL({
      redirect_uri: "http://localhost:5173/oauth-callback",
      scope: ["meeting:write:meeting"],
    });

    window.location.href = authUrl;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Connect your Zoom account</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={onConnect}
      >
        Connect
      </button>
    </div>
  );
};

import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { saveToken } from "@/services/zoom";

export const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();

  const { status } = useQuery({
    queryKey: ["zoom-oauth-callback"],
    queryFn: () => saveToken(searchParams.get("code") ?? ""),
    enabled: searchParams.has("code"),
  });

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "success") {
    return <Navigate to="/booking" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
};

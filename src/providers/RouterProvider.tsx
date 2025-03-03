import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import App from "../App";
import { BookingPage } from "@/pages/booking";
import { OAuthCallbackPage } from "@/pages/oauth-callback";
import { ConnectPage } from "@/pages/connect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ConnectPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/oauth-callback",
        element: <OAuthCallbackPage />,
      },
    ],
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

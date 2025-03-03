import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import App from "../App";
import { BookingPage } from "@/pages/booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/booking",
        element: <BookingPage />,
      },
    ],
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

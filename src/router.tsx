import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Account } from "./pages/account/account";
import PrivateRoute from "./components/authenticated-route";
import PublicRoute from "./components/public-route";

export const router = createBrowserRouter([
   {
    path: "/",
    element: <PublicRoute children={<Home />} />,
   },
   {
      path: "/account",
      element: <PrivateRoute children= {<Account />}/>,
   }
  ]);
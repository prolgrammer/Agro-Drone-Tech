import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "@pages/site"
import { SignInPage } from "@pages/authentication/sign-in"
import { SignUpPage } from "@pages/authentication/sign-up"
import { ProfilePage } from "@pages/private-office/profile"
import { HorizontalBarChart } from "@pages/test"
import { AreaArchivePage } from "@pages/private-office/area/archive"
import { AreaCreatePage } from "@pages/private-office/area/create"
import { AreaSinglePage } from "@pages/private-office/area/single"
import { QueryArchivePage } from "@pages/private-office/query/archive"
import { QueryCreatePage } from "@pages/private-office/query/create"
import { UserArchivePage } from "@pages/private-office/user/archive"
export const generateMockData = (count: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return Array.from({ length: count }, (_, i) => ({
    label: months[i % months.length], // Cycles through months
    value: Math.floor(Math.random() * 100) + 10, // Random value between 10 and 100
  }));
};
const data = generateMockData(12);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "log-in",
    element: <SignInPage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
  {
    path: "private-office/profile",
    element: <ProfilePage />,
  },
  // {
  //   path: "test",
  //   element: <HorizontalBarChart data={data} />,
  // },
  {
    path: "private-office/area",
    element: <AreaArchivePage />,
  },
  {
    path: "private-office/area/create",
    element: <AreaCreatePage />,
  },
  {
    path: "private-office/area/single",
    element: <AreaSinglePage />,
  },
  {
    path: "private-office/query",
    element: <QueryArchivePage />,
  },
  {
    path: "private-office/query/create",
    element: <QueryCreatePage />,
  },
  {
    path: "private-office/users",
    element: <UserArchivePage />,
  },
])
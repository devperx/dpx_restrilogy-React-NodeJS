import { HomePage } from "../components/Home/HomePage";
import { DashboardPage } from "../components/Dashboard/DashboardPage";
import { LayoutPrivate, LayoutPublic } from "../components/AppLayout";

export const ROUTES_APP = [
    {
        path: "/admin/*",
        element: LayoutPrivate,
        exact: false,
        routes: [
            {
                path: "/",
                element: DashboardPage,
                exact: true,
            }
        ]
    },
    {
        path: "/*",
        element: LayoutPublic,
        exact: false,
        routes: [
            {
                path: "/",
                element: HomePage,
                exact: true
            },
        ]
    }
];
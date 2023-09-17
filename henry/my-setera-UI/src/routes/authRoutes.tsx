import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appAuthRoutes from "./appNonAuthRoutes";
import { RouteType } from "./config";

const generateRoute = (routes: RouteType[]): ReactNode => {
    return routes.map((route, index) => (
        route.index ? (
            <Route
                index
                path={route.path}
                element={
                    <PageWrapper
                        state={route.state}
                        pagetitle={route.customtitle ? route.customtitle : route.sidebarProps?.displayText} children={route.element} />
                }
                key={index}
            />
        ) : (
            <Route
                path={route.path}
                element={
                    <PageWrapper state={route.child ? undefined : route.state} pagetitle={route.customtitle ? route.customtitle : route.sidebarProps?.displayText}>
                        {route.element}
                    </PageWrapper>
                }
                key={index}
            >
                {route.child && (
                    generateRoute(route.child)
                )}
            </Route>
        )
    ));
};
export const routesAuth: ReactNode = generateRoute(appAuthRoutes);
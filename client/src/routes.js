// определяем все наборы routes
import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        //to user logged in
        return (
            <Switch>
                <Route path={"/links"} exact>
                    <LinksPage/>
                </Route>
                <Route path={"/create"} exact>
                    <CreatePage/>
                </Route>
                <Route path={"/detail"}>
                    <DetailPage/>
                </Route>
                <Redirect to={"/create"}/>
            </Switch>

        )
    }
    //to user that not logged in yet
    return (
        <Switch>
            <Route path={"/"} exact>
                <AuthPage/>
            </Route>
            <Redirect to={"/"}/>
        </Switch>
    )
}
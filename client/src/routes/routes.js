import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";

export const routes = [
    {
        path: "/register",
        component: RegisterPage,
    }, 
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/",
        component: WelcomePage,

    },
    {
        path: "/dashboard",
        component: DashboardPage,
        protected: true,
    },
];

export default routes;
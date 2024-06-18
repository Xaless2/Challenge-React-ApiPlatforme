import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

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
        protected: false,
    },
    {
        path: "/profile",
        component: ProfilePage,
        protected: false,
    },
];

export default routes;
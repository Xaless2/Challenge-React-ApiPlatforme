import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WelcomePage from "../pages/welcomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import CalendarPage from "../pages/CalendarPage.jsx";
import EtablishmentPage from "../pages/EtablishmentPage.jsx";

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
        path: "/etablishment",
        component: EtablishmentPage,
        protected: false,
    },
    {
        path: "/profile",
        component: ProfilePage,
        protected: false,
    },
    {
        path: "/calendar",
        component: CalendarPage,
        protected: false,
    },



];

export default routes;
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import EtablishmentPage from "../pages/EtablishmentPage.jsx";
import SlotPage from "../pages/SlotPage.jsx";
import PerformancePage from "../pages/PerformancePage.jsx";

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
        component: DashboardPage
    },
    {
        path: "/etablishment",
        component: EtablishmentPage,
        protected: false,
    },
    {
        path: "/profile",
        component: ProfilePage
    },
    {
        path: "/establishments/:id", 
        component: EtablishmentPage
    },
    {
        path: "/create-performance",
        component: PerformancePage,
        protected: false,
    },
    {
        path: "/create-slot",
        component: SlotPage,
        protected: false,
    },
];

export default routes;

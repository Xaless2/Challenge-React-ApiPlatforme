import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import CalendarPage from "../pages/CalendarPage.jsx";
import EtablishmentPage from "../pages/EtablishmentPage.jsx";
import SlotPage from "../pages/SlotPage.jsx";
import PerformancePage from "../pages/PerformancePage.jsx";
import Unauthorized from "../components/EstablishmentDetail/Unauthorized.jsx";

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
        roles: [],
    },
    {
        path: "/etablishment",
        component: EtablishmentPage,
        protected: true,
        roles: [],
    },
    {
        path: "/profile",
        component: ProfilePage,
        protected: true,
    },
    {
        path: "/establishments/:id",
        component: EtablishmentPage,
        protected: true,
    },
    {
        path: "/create-performance",
        component: PerformancePage,
        protected: true,
    },
    {
        path: "/create-slot",
        component: SlotPage,
        protected: true,
    },
    {
        path: "/unauthorized",
        component: Unauthorized,
    },
    {
        path: "/calendar",
        component: CalendarPage,
        protected: true,
    },



];

export default routes;

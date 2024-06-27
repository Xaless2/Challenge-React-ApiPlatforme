import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import EstablishmentPage from "../pages/EstablishmentPage.jsx"; // Importer la nouvelle page

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
        path: "/profile",
        component: ProfilePage
    },
    {
        path: "/establishments/:id", 
        component: EstablishmentPage
    },
];

export default routes;

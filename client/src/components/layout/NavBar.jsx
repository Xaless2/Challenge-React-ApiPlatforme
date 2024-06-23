import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Button
} from "@nextui-org/react";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../contexts/AuthContext";


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, userRole, logout } = useContext(AuthContext);

  let menuItems = [];

  if (token) {
    if (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_COACH') {
      menuItems = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Log Out", link: "/" }
      ];
    } else if (userRole === 'ROLE_CLIENT') {
      menuItems = [
        { name: "Profile", link: "profile" },
        { name: "Log Out", link: "/" }
      ];
    }
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border w-full shadow">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground" size="lg" className="hover:underline text:black transition duration-200">
            <img src={logo} alt="PlaniFit" width="100" height="42" className="w-32 text-white" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page" className="hover:underline  transition duration-200" style={{
            color: 'black',
            fontWeight:'lighter'
          }}>
            voir nos établisements
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {token && userRole === 'ROLE_CLIENT' && (
          <NavbarItem>
            <Link href="/profile" color="primary" className="hover:underline text:black transition duration-200" style={{
              color: 'black',
              fontWeight:'lighter'
            }}>
              Profile
            </Link>
          </NavbarItem>
        )}
        {token && (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_COACH') && (
         <NavbarItem>
          <Button
            color="primary"
            auto
            size="small"
            className="text-black transition duration-200 bg-[#EBF8F9] hover:bg-[#EBF8F9]"
            style={{
              fontWeight: 'lighter',
            }}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Accedez à votre dashboard
          </Button>
       </NavbarItem>
        )}
        <NavbarItem>
        <Button
            color="primary"
            auto
            size="small"
            className={`btn btn-primary ${token ? 'text-red-black bg-red-400' : 'text-white bg-black'}`}
            variant="contained"
            onClick={() => {
              if (token) {
                logout();
                window.location.href = "/"; 
              } else {
                window.location.href = "/login";
              }
            }}
          >
            {token ? "Se deconnecter" : "Se Connecter"}
        </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
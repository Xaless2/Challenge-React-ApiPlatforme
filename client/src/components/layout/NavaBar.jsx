import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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
        { name: "Log Out", link: "#" }
      ];
    } else if (userRole === 'ROLE_CLIENT') {
      menuItems = [
        { name: "Profile", link: "#" },
        { name: "Log Out", link: "#" }
      ];
    }
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border w-full shadow">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden "
        />
        <NavbarBrand>
          <Link href="/" color="foreground" size="lg">
          <img src={logo} alt="PlaniFit" width="100" height="42" className="w-32 text-white" />
          </Link>
          
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {/* <Link color="foreground" href="#">
            Features
          </Link> */}
        </NavbarItem>
        <NavbarItem isActive>
          {/* <Link href="#" aria-current="page">
            Customers
          </Link> */}
        </NavbarItem>
        <NavbarItem>
          {/* <Link color="foreground" href="#">
            Integrations
          </Link> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {token && userRole === 'ROLE_CLIENT' && (
          <NavbarItem >
            <div style={{
              backgroundColor:"red",
            }}>
            <Link href="/profile" color="primary">
              Profile
            </Link>
            </div>
           
          </NavbarItem>
        )}
        {token && (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_COACH') && (
          <NavbarItem>
            <Link href="/dashboard" color="primary">
              Dashboard
            </Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <Button
            color="primary"
            auto
            size="small"
            className="btn btn-primary"
            variant="contained"
            onClick={() => {
              if (token) {
                logout();
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
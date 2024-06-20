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
  console.log(userRole);

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
          <img src={logo} alt="PlaniFit" width="100" height="42" className="w-32 text-white" />
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
        <NavbarItem>
          <Button
            color="primary"
            auto
            size="small"
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
      <NavbarMenu>
        {token && menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={item.name === "Log Out" ? "danger" : "foreground"}
              className="w-full"
              href={item.link}
              size="lg"
              onClick={() => {
                if (item.name === "Log Out") {
                  logout();
                }
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!token && (
          <>
            <NavbarMenuItem key="register">
              <Link
                color="primary"
                className="w-full"
                href="/register"
                size="lg"
              >
                Create Account
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem key="login">
              <Link
                color="primary"
                className="w-full"
                href="/login"
                size="lg"
              >
                Log In
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}

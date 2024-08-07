// import React from "react";
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";


// export default function NavBar() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const menuItems = [
//     "Profile",
//     "Log Out",
//     "devenir membre",,

//   ];

//   return (
// <Navbar onMenuOpenChange={setIsMenuOpen} className="border  w-full shadow">
//       <NavbarContent>
//         <NavbarMenuToggle
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           className="sm:hidden "
//         />
//         <NavbarBrand>
    
//           <p className="font-bold text-inherit">PlaniFit💪</p>
//         </NavbarBrand>
//       </NavbarContent>

//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           {/* <Link color="foreground" href="#">
//             Features
//           </Link> */}
//         </NavbarItem>
//         <NavbarItem isActive>
//           {/* <Link href="#" aria-current="page">
//             Customers
//           </Link> */}
//         </NavbarItem>
//         <NavbarItem>
//           {/* <Link color="foreground" href="#">
//             Integrations
//           </Link> */}
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             créer un compte
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarMenu>
//         {menuItems.map((item, index) => (
//           <NavbarMenuItem key={`${item}-${index}`}>
//             <Link
//               color={
//                 index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
//               }
//               className="w-full"
//               href="#"
//               size="lg"
//             >
//               {item}
//             </Link>
//           </NavbarMenuItem>
//         ))}
//       </NavbarMenu>
//     </Navbar>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/calendar">Calendar</Link></li>
                <li><Link to="/slots">Slots</Link></li>
                <li><Link to="/subscribe">Subscribe</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

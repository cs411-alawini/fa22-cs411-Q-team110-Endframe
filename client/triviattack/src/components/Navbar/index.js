import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavBarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/home" activeStyle>
            Home
          </NavLink>
          <NavLink to="/take-quiz" activeStyle>
            Take Quiz
          </NavLink>
          <NavLink to="/user-profile" activeStyle>
            User Profile
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
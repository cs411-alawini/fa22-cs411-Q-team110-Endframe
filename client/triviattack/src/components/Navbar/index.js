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
          <NavLink to="/create-quiz" activeStyle>
            Create Quiz
          </NavLink>
          <NavLink to="/question-text" activeStyle>
            Display Question
          </NavLink>
          <NavLink to="/delete-user" activeStyle>
            Delete User
          </NavLink>
          <NavLink to="/question-list" activeStyle>
            Question List
          </NavLink>
          <NavLink to="/user-stats" activeStyle>
            See User Stats
          </NavLink>
          <NavLink to="/team-members" activeStyle>
            See Team Members
          </NavLink>
          <NavLink to="/team-stats" activeStyle>
            See Team Stats
          </NavLink>
          <NavLink to="/update-username" activeStyle>
            Update Username
          </NavLink>
          <NavLink to="/user-info" activeStyle>
            User Info
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
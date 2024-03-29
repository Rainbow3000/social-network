import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.scss'
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import {userLogout} from '.././../store/slice/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import { ReactComponent as LogoWhite } from "../../assets/images/logos/xtremelogowhite.svg";
import { ToastContainer, toast } from 'react-toastify';
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {user} = useSelector(state => state.user); 
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const handleLogout  = ()=>{
    dispatch(userLogout()); 
    navigate('/auth')
  }
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar className="header-container" dark expand="md">
      <ToastContainer/>
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
        
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{display:'flex',alignItems:'center'}}>
          <DropdownToggle color="light">
            <img
              src={user?.data?.avatar}
              alt="profile"
              className="avatar-circle"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
          
        
    
        
            <DropdownItem onClick={handleLogout}>Thoát</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;

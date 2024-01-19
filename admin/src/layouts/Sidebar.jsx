import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Trang chủ",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },

  {
    title: "Bài viết",
    href: "/post-list",
    icon: "bi bi-card-text",
  },
  {
    title: "Đơn tố cáo",
    href: "/denounce",
    icon: "bi bi-patch-check",
  },
  {
    title: "Thông báo hệ thống",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Tin nhắn",
    href: "/chat",
    icon: "bi bi-chat-left-dots",
  },
  {
    title: "Bài viết của tôi",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Thông báo của tôi",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Hồ sơ của tôi",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Tài khoản của tôi",
    href: "/forms",
    icon: "bi bi-person",
  },
  {
    title: "Thoát",
    href: "/breadcrumbs",
    icon: "bi bi-box-arrow-right",
  },

];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
       
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

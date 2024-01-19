import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Profile from "../views/profile/Profile.jsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.jsx"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.jsx"));
const About = lazy(() => import("../views/About.jsx"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Chat = lazy(() => import("../views/ui/Chat.js"));
const AdminPostList = lazy(() => import("../views/ui/AdminPost.js"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Account = lazy(() => import("../views/ui/Account.js"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Login = lazy(()=> import("../views/login/Login.jsx")); 
const PostList = lazy(()=> import("../views/postList/PostList.jsx")); 
const Denounce = lazy(()=> import("../views/denounce/Denounce.jsx")); 
/*****Routes******/

const ThemeRoutes = [
  {
    path: "",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/chat", exact: true, element: <Chat /> },
      { path: "/admin/post", exact: true, element: <AdminPostList /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/account", exact: true, element: <Account /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/post-list", exact: true, element: <PostList /> },
      { path: "/denounce", exact: true, element: <Denounce /> },
      { path: "/profile/:id", exact: true, element: <Profile /> }
    ],
  },
  {
    path:"auth",
    element:<Login/>
  }
];

export default ThemeRoutes;

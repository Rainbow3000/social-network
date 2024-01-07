import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link style={{textDecoration:'none',fontWeight:'bold'}} className="link" to="/">
      <h1>K2 Meet</h1>
    </Link>
  );
};

export default Logo;

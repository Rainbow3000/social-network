import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import EditProfile from '../../components/editProfile/EditProfile'
import AccountUser from '../../components/account/Account'

const Account = () => {
  return (
    <>
    <Row>
      <EditProfile/>
    </Row>
    <Row>
    <AccountUser/>
  </Row>
    </>
  );
};

export default Account;

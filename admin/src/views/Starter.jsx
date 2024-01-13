import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import UserList from "../components/dashboard/UserList";
import TopCards from "../components/dashboard/TopCards";
import {useSelector,useDispatch} from 'react-redux'
import {deleteUser} from '../store/slice/userSlice'

const Starter = () => { 
  const {postLength,userLength}  = useSelector(state => state.stat)

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Người dùng"
            earning={userLength}
            icon="bi bi-person"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Bài viết"
            earning={postLength}
            icon="bi bi-sticky"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Lượt truy cập"
            earning="456"
            icon="bi bi-reception-0"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-danger"
            title="Sales"
            subtitle="Tài khoản bị khóa"
            earning="210"
            icon="bi bi-lock-fill"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <UserList />
        </Col>
      </Row>
      {/***Blog Cards***/}
      {/* <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default Starter;

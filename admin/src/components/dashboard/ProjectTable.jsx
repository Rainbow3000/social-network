import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import {useSelector,useDispatch} from 'react-redux'
import {getUserList} from '../../store/slice/userSlice'
import { useEffect } from "react";
const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const ProjectTables = () => {

  const {user} = useSelector(state => state.user); 
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserList()); 
  },[]) 
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danh sách người dùng</CardTitle>
         

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Giới tính</th>
                <th>Số bài viết</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 && user.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata._id.userName}</h6>
                        <span className="text-muted">{tdata._id.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.gender === "1" ?'Nam':tdata.gender === "2" ?'Nữ':'Khác'}</td>
                  <td>{tdata.postNumber}</td>
                  <td>
                    {tdata.status === -1 ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === 0 ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td style={{display:'flex',alignItems:'center',transform:'translateY(40%)'}}>
                      <div>
                      <i  class="bi bi-slash-circle text-info"></i>
                      </div>
                      <div style={{marginLeft:30}}>
                        <i class="bi bi-trash3 text-danger"></i>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;

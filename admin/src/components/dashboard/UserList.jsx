import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import {useSelector,useDispatch} from 'react-redux'
import {getUserList,deleteUser,setIsSuccess,blockAccount} from '../../store/slice/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

const ProjectTables = () => {

  const {userList,isSuccess,successMessage} = useSelector(state => state.user); 
  const dispatch = useDispatch()
  const handleDeleteUser = (userId)=>{
    dispatch(deleteUser(userId)); 
  }

  const handleBlockAccount = (userId)=>{
    dispatch(blockAccount({id:userId})); 
  }

  if(isSuccess){
    dispatch(getUserList()); 
    dispatch(setIsSuccess(false))
    toast.success(successMessage)
  }

  useEffect(()=>{
    dispatch(getUserList()); 
  },[]) 
  return (
    <div>
      <ToastContainer/>
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
              {userList?.length > 0 && userList?.map((tdata, index) => (
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
                      <span title="Tài khoản bị khóa" className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === 1 ? (
                      <span title="Đang hoạt động" className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td style={{display:'flex',alignItems:'center',transform:'translateY(40%)'}}>
                      <div title="Khóa tài khoản" style={{cursor:'pointer'}} onClick={()=> handleBlockAccount(tdata._id._id)}>
                      <i  class="bi bi-slash-circle text-info"></i>
                      </div>
                      <div title="Xóa tài khoản" st style={{marginLeft:30,cursor:'pointer'}} onClick={()=> handleDeleteUser(tdata._id._id)}>
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

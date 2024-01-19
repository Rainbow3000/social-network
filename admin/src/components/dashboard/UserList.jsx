import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import {useSelector,useDispatch} from 'react-redux'
import {getUserList,deleteUser,setIsSuccess,blockAccount} from '../../store/slice/userSlice'
import {setUserLength} from '../../store/slice/statSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLockClosedOutline } from "react-icons/io5";
import { useEffect } from "react";
import {Link} from 'react-router-dom'
const ProjectTables = () => {

  const {userList,isSuccess,successMessage} = useSelector(state => state.user); 
  const dispatch = useDispatch()
  const handleDeleteUser = (userId)=>{
    dispatch(deleteUser(userId)); 
  }

  const handleBlockAccount = (userData)=>{
    dispatch(blockAccount({id:userData._id._id})); 
  }

  if(isSuccess){
    dispatch(getUserList()); 
    dispatch(setUserLength())
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

                      <Link to = {`/profile/${tdata._id._id}`}>
                        <div className="icon-wrapper-user" title="Xem chi tiết" st style={{marginRight:10,cursor:'pointer',border:'1px solid rgba(128, 128, 128, 0.267)',padding:'0 5px',borderRadius:'5px'}}>
                          <i class="bi bi-eye text-primary"></i>
                        </div>
                      </Link>
                      <div className="icon-wrapper-user" title="Khóa tài khoản" style={{cursor:'pointer',border:'1px solid rgba(128, 128, 128, 0.267)',padding:'0 5px',borderRadius:'5px'}} onClick={()=> handleBlockAccount(tdata)}>
                        <IoLockClosedOutline className="text-warning"/>
                      </div>
                      <div className="icon-wrapper-user" title="Xóa tài khoản" st style={{marginLeft:10,cursor:'pointer',border:'1px solid rgba(128, 128, 128, 0.267)',padding:'0 5px',borderRadius:'5px'}} onClick={()=> handleDeleteUser(tdata._id._id)}>
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

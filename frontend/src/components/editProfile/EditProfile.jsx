import React from 'react'
import './editProfile.scss'
import { IoCloudUploadOutline } from "react-icons/io5";
const EditProfile = () => {
  return (
    <div className='edit-profile-container'>
        <form>
            <div className='image-upload'>
                <img src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />
                <div className='upload-icon'>
                    <IoCloudUploadOutline/>
                </div>
            </div>
            <div className='input-list-wrapper'>
                <div className='input-item'>
                    <label htmlFor="">Họ tên</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Ngày sinh</label>
                    <input type="date" />
                   
                </div>

                <div className='input-item'>
                    <label htmlFor="">Giới tính</label>
                    <div className='gender-wrapper'>
                        <div className='gender-item'>
                            <input type="radio" value="Nam" name="gender"  />
                            <label htmlFor="">Nam</label>
                        </div>

                        <div className='gender-item'>
                            <input type="radio" value="Nữ" name="gender"  />
                            <label htmlFor="">Nữ</label>
                        </div>
                        <div className='gender-item'>    
                            <input type="radio" value="Khác" name="gender"  />
                            <label htmlFor="">Khác</label>
                        </div>
                    </div>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Nơi sống</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Nghề nghiệp</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Facebook</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Twitter</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Instagram</label>
                    <input type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">LinkedIn</label>
                    <input type="text"/>
                </div>
                
                <div className='input-item'>
                    <button className='btn-update'>Cập nhật</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditProfile
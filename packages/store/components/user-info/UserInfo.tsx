import React from 'react'


const UserInfo = ({ user }: any) => {
    return (
        <div className='user-info'>
            <div className="icon_size">
            <i className="bx bx-user-circle" ></i>
                
            </div>
            <div className="user-info__name">
                <span>{user}</span>
            </div>
        </div>
    )
}


export default UserInfo

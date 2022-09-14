import React from 'react'
// import './topnav.scss'
import UserInfo from '../user-info/UserInfo'


const TopNav = ({ user }) => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    return (
        <div className='topnav'>
            <UserInfo user={user} />
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav

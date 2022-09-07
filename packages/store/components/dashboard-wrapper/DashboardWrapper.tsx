import React from 'react'
import { NextPage } from "next";

interface P {
    children: React.ReactNode
}


const DashboardWrapper = ({children}: P) => {
    return (
        <div className='dashboard-wrapper'>
            {children}
        </div>
    )
}

export default DashboardWrapper

export const DashboardWrapperMain = ({children}: P) => {
    return (
        <div className='dashboard-wrapper__main'>
            {children}
        </div>
    )
}

export const DashboardWrapperRight = ({children}: P) => {
    return (
        <div className='dashboard-wrapper__right'>
            {children}
        </div>
    )
}
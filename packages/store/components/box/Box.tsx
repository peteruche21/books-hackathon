import React from 'react'

interface P {
    children: React.ReactNode
    purple?: string
    fullheight?: string
}

const Box = (props: P) => {
    const className = {
        box: 'box',
        purple: props.purple && 'box-purple',
        fullheight: props.fullheight && 'box-fullheight'
    }

    return (
        <div className={Object.values(className).join(' ')}>
            {props.children}
        </div>
    )
}

export default Box

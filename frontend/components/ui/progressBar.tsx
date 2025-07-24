import React from 'react'

type Props = {
    color: string
    percentage: string
}

const ProgressBar = (props: Props) => {
    return (
        <div
            className={`h-2 transition-all duration-300 ${props.color}`}
            style={{
                width: `${props.percentage}%`
            }}
        />
    )
}

export default ProgressBar
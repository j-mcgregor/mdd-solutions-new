import * as React from 'react'

const Polygon: React.FC<{ fillColor?: string }> = ({ fillColor }) => {
    return (
        <svg
            className="absolute bottom-0 overflow-hidden "
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
        >
            <polygon fill={fillColor} points="2560 0 2560 100 0 100"></polygon>
        </svg>
    )
}

export default Polygon
